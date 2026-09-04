import csv

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import (
    get_object_or_404,
    redirect,
    render,
)
from django.utils import timezone

from planos.models import Plano
from usuarios.decorators import somente_estudante

from .forms import EventoForm
from .models import Evento, Favorito


# =========================================================
# AUXILIAR - PERMISSÃO PARA GERENCIAR EVENTO
# =========================================================

def pode_gerenciar_evento(usuario, evento):

    return (
        usuario.is_superuser
        or usuario.tipo_usuario == 'administrador'
        or evento.organizador == usuario
    )


# =========================================================
# DETALHE DO EVENTO
# =========================================================

def detalhe_evento(request, evento_id):

    evento = get_object_or_404(
        Evento,
        id=evento_id,
        ativo=True
    )

    agora = timezone.now()

    inscrito = False
    favoritado = False

    # =====================================================
    # USUÁRIO LOGADO
    # =====================================================

    if request.user.is_authenticated:

        # Inscrição usa "estudante"
        inscrito = evento.inscricoes.filter(
            estudante=request.user,
            status='confirmada'
        ).exists()

        # Favorito usa "usuario"
        favoritado = Favorito.objects.filter(
            usuario=request.user,
            evento=evento
        ).exists()

    # =====================================================
    # VAGAS
    # =====================================================

    total_inscritos = (
        evento.inscricoes
        .filter(
            status='confirmada'
        )
        .count()
    )

    vagas_disponiveis = max(
        evento.limite_vagas - total_inscritos,
        0
    )

    # =====================================================
    # INSCRIÇÕES ABERTAS
    # =====================================================

    inscricoes_abertas = (
        evento.permite_inscricoes
        and evento.ativo
        and agora <= evento.data_limite_inscricao
        and agora < evento.data_inicio
    )

    contexto = {
        'evento': evento,
        'inscrito': inscrito,
        'favoritado': favoritado,
        'total_inscritos': total_inscritos,
        'vagas_disponiveis': vagas_disponiveis,
        'inscricoes_abertas': inscricoes_abertas,
    }

    return render(
        request,
        'eventos/detalhe.html',
        contexto
    )


# =========================================================
# PAINEL DO ORGANIZADOR
# =========================================================

@login_required
def painel_organizador(request):

    if not (
        request.user.is_superuser
        or request.user.tipo_usuario in (
            'organizador',
            'administrador'
        )
    ):

        messages.error(
            request,
            'Você não possui acesso à área do organizador.'
        )

        return redirect('home')

    agora = timezone.now()

    # =====================================================
    # EVENTOS QUE O USUÁRIO PODE VER
    # =====================================================

    if (
        request.user.is_superuser
        or request.user.tipo_usuario == 'administrador'
    ):

        eventos = Evento.objects.all()

    else:

        eventos = Evento.objects.filter(
            organizador=request.user
        )

    eventos = eventos.order_by(
        '-criado_em'
    )

    # =====================================================
    # RESUMO
    # =====================================================

    total_eventos = eventos.count()

    eventos_ativos = eventos.filter(
        ativo=True
    ).count()

    proximos_eventos = eventos.filter(
        ativo=True,
        data_inicio__gt=agora
    ).order_by(
        'data_inicio'
    )

    eventos_em_andamento = eventos.filter(
        ativo=True,
        data_inicio__lte=agora,
        data_fim__gte=agora
    ).order_by(
        'data_fim'
    )

    eventos_encerrados = eventos.filter(
        data_fim__lt=agora
    ).order_by(
        '-data_fim'
    )

    total_inscricoes = sum(
        evento.inscricoes.filter(
            status='confirmada'
        ).count()
        for evento in eventos
    )

    total_presentes = sum(
        evento.inscricoes.filter(
            status='confirmada',
            presenca__confirmada=True
        ).count()
        for evento in eventos
    )

    if total_inscricoes > 0:

        taxa_presenca = round(
            (
                total_presentes
                / total_inscricoes
            ) * 100,
            1
        )

    else:

        taxa_presenca = 0

    contexto = {
        'eventos': eventos,
        'total_eventos': total_eventos,
        'eventos_ativos': eventos_ativos,
        'total_inscricoes': total_inscricoes,
        'total_presentes': total_presentes,
        'taxa_presenca': taxa_presenca,
        'proximos_eventos': proximos_eventos,
        'eventos_em_andamento': eventos_em_andamento,
        'eventos_encerrados': eventos_encerrados,
    }

    return render(
        request,
        'eventos/painel_organizador.html',
        contexto
    )


# =========================================================
# CRIAR EVENTO
# =========================================================

@login_required
def criar_evento(request):

    # =====================================================
    # PERMISSÃO
    # =====================================================

    if not (
        request.user.is_superuser
        or request.user.tipo_usuario in (
            'organizador',
            'administrador'
        )
    ):

        messages.error(
            request,
            'Apenas organizadores podem criar eventos.'
        )

        return redirect('home')

    # =====================================================
    # PLANO ESCOLHIDO
    # =====================================================

    plano_id = (
        request.GET.get('plano')
        or request.POST.get('plano')
    )

    # Se tentar abrir /eventos/criar/ diretamente,
    # manda primeiro para a escolha dos planos.

    if not plano_id:

        messages.info(
            request,
            'Escolha um plano para criar seu evento.'
        )

        return redirect(
            'planos:escolher'
        )

    plano_selecionado = get_object_or_404(
        Plano,
        id=plano_id,
        ativo=True
    )

    # =====================================================
    # POST - CRIAR EVENTO
    # =====================================================

    if request.method == 'POST':

        form = EventoForm(
            request.POST,
            request.FILES,
            organizador=request.user,
            plano_selecionado=plano_selecionado
        )

        if form.is_valid():

            evento = form.save(
                commit=False
            )

            evento.organizador = (
                request.user
            )

            evento.plano = (
                plano_selecionado
            )

            evento.save()

            messages.success(
                request,
                (
                    'Evento criado com sucesso '
                    f'com o plano '
                    f'{plano_selecionado.nome}!'
                )
            )

            return redirect(
                'eventos:painel_organizador'
            )

    # =====================================================
    # GET - MOSTRAR FORMULÁRIO
    # =====================================================

    else:

        form = EventoForm(
            organizador=request.user,
            plano_selecionado=plano_selecionado
        )

    return render(
        request,
        'eventos/criar.html',
        {
            'form': form,
            'plano_selecionado':
                plano_selecionado,
        }
    )


# =========================================================
# GERENCIAR EVENTO
# =========================================================

@login_required
def gerenciar_evento(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para gerenciar este evento.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    # =====================================================
    # PARTICIPANTES
    # =====================================================

    inscricoes = (
        evento.inscricoes
        .filter(
            status='confirmada'
        )
        .select_related(
            'estudante',
            'presenca'
        )
        .order_by(
            'estudante__first_name',
            'estudante__username'
        )
    )

    total_inscritos = (
        inscricoes.count()
    )

    total_presentes = (
        inscricoes
        .filter(
            presenca__confirmada=True
        )
        .count()
    )

    total_ausentes = (
        total_inscritos
        - total_presentes
    )

    vagas_disponiveis = max(
        evento.limite_vagas
        - total_inscritos,
        0
    )

    contexto = {
        'evento': evento,
        'inscricoes': inscricoes,
        'total_inscritos': total_inscritos,
        'total_presentes': total_presentes,
        'total_ausentes': total_ausentes,
        'vagas_disponiveis': vagas_disponiveis,
    }

    return render(
        request,
        'eventos/gerenciar.html',
        contexto
    )


# =========================================================
# EDITAR EVENTO
# =========================================================

@login_required
def editar_evento(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para editar este evento.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    # =====================================================
    # POST
    # =====================================================

    if request.method == 'POST':

        form = EventoForm(
            request.POST,
            request.FILES,
            instance=evento
        )

        if form.is_valid():

            form.save()

            messages.success(
                request,
                'Evento atualizado com sucesso!'
            )

            return redirect(
                'eventos:gerenciar',
                evento_id=evento.id
            )

    # =====================================================
    # GET
    # =====================================================

    else:

        form = EventoForm(
            instance=evento
        )

    return render(
        request,
        'eventos/editar.html',
        {
            'form': form,
            'evento': evento,
        }
    )


# =========================================================
# RELATÓRIO DO EVENTO
# =========================================================

@login_required
def relatorio_evento(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para visualizar este relatório.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    # =====================================================
    # PLANO POSSUI RELATÓRIO?
    # =====================================================

    if not evento.permite_relatorios:

        messages.error(
            request,
            (
                'O plano deste evento não inclui '
                'acesso aos relatórios.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    # =====================================================
    # DADOS
    # =====================================================

    inscricoes = (
        evento.inscricoes
        .filter(
            status='confirmada'
        )
        .select_related(
            'estudante',
            'presenca'
        )
    )

    total_inscritos = (
        inscricoes.count()
    )

    total_presentes = (
        inscricoes
        .filter(
            presenca__confirmada=True
        )
        .count()
    )

    total_ausentes = (
        total_inscritos
        - total_presentes
    )

    total_certificados = (
        inscricoes
        .filter(
            presenca__confirmada=True,
            presenca__certificado__ativo=True
        )
        .count()
    )

    if total_inscritos > 0:

        taxa_presenca = round(
            (
                total_presentes
                / total_inscritos
            ) * 100,
            1
        )

    else:

        taxa_presenca = 0

    contexto = {
        'evento': evento,
        'inscricoes': inscricoes,
        'total_inscritos': total_inscritos,
        'total_presentes': total_presentes,
        'total_ausentes': total_ausentes,
        'total_certificados': total_certificados,
        'taxa_presenca': taxa_presenca,
    }

    return render(
        request,
        'eventos/relatorio.html',
        contexto
    )


# =========================================================
# EXPORTAR RELATÓRIO CSV
# =========================================================

@login_required
def exportar_relatorio_csv(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para exportar este relatório.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    # =====================================================
    # PLANO POSSUI RELATÓRIO?
    # =====================================================

    if not evento.permite_relatorios:

        messages.error(
            request,
            (
                'O plano deste evento não inclui '
                'exportação de relatórios.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    inscricoes = (
        evento.inscricoes
        .filter(
            status='confirmada'
        )
        .select_related(
            'estudante',
            'presenca'
        )
        .order_by(
            'estudante__first_name',
            'estudante__username'
        )
    )

    # =====================================================
    # RESPOSTA CSV
    # =====================================================

    response = HttpResponse(
        content_type=(
            'text/csv; charset=utf-8'
        )
    )

    response[
        'Content-Disposition'
    ] = (
        f'attachment; '
        f'filename="relatorio_evento_{evento.id}.csv"'
    )

    # BOM para o Excel entender UTF-8
    response.write(
        '\ufeff'
    )

    writer = csv.writer(
        response,
        delimiter=';'
    )

    writer.writerow([
        'Nome',
        'Usuário',
        'E-mail',
        'Instituição',
        'Curso',
        'Status da inscrição',
        'Presença',
        'Certificado',
    ])

    # =====================================================
    # LINHAS
    # =====================================================

    for inscricao in inscricoes:

        estudante = (
            inscricao.estudante
        )

        presenca_confirmada = (
            hasattr(
                inscricao,
                'presenca'
            )
            and inscricao.presenca.confirmada
        )

        certificado_emitido = False

        if (
            hasattr(
                inscricao,
                'presenca'
            )
            and hasattr(
                inscricao.presenca,
                'certificado'
            )
        ):

            certificado_emitido = (
                inscricao
                .presenca
                .certificado
                .ativo
            )

        writer.writerow([
            (
                estudante.get_full_name()
                or estudante.username
            ),

            estudante.username,

            estudante.email,

            estudante.instituicao,

            estudante.curso,

            inscricao.get_status_display(),

            (
                'Presente'
                if presenca_confirmada
                else 'Ausente'
            ),

            (
                'Emitido'
                if certificado_emitido
                else 'Não emitido'
            ),
        ])

    return response


# =========================================================
# ATIVAR / DESATIVAR EVENTO
# =========================================================

@login_required
def alterar_status_evento(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para alterar este evento.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    if request.method == 'POST':

        evento.ativo = (
            not evento.ativo
        )

        evento.save(
            update_fields=[
                'ativo'
            ]
        )

        if evento.ativo:

            messages.success(
                request,
                'Evento ativado com sucesso.'
            )

        else:

            messages.success(
                request,
                'Evento desativado com sucesso.'
            )

    return redirect(
        'eventos:painel_organizador'
    )


# =========================================================
# FAVORITAR / DESFAVORITAR
# =========================================================

@login_required
@somente_estudante
def alternar_favorito(
    request,
    evento_id
):

    evento = get_object_or_404(
        Evento,
        id=evento_id,
        ativo=True
    )

    if request.method != 'POST':

        return redirect(
            'eventos:detalhe',
            evento_id=evento.id
        )

    favorito = (
        Favorito.objects
        .filter(
            usuario=request.user,
            evento=evento
        )
        .first()
    )

    if favorito:

        favorito.delete()

        messages.success(
            request,
            'Evento removido dos favoritos.'
        )

    else:

        Favorito.objects.create(
            usuario=request.user,
            evento=evento
        )

        messages.success(
            request,
            'Evento adicionado aos favoritos.'
        )

    return redirect(
        'eventos:detalhe',
        evento_id=evento.id
    )


# =========================================================
# MEUS FAVORITOS
# =========================================================

@login_required
@somente_estudante
def meus_favoritos(request):

    eventos = (
        Evento.objects
        .filter(
            favoritos__usuario=request.user,
            ativo=True
        )
        .order_by(
            'data_inicio'
        )
        .distinct()
    )

    return render(
        request,
        'eventos/favoritos.html',
        {
            'eventos': eventos
        }
    )