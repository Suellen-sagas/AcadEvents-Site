import csv

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from usuarios.decorators import somente_estudante

from .forms import EventoForm
from .models import Evento, Favorito


def pode_gerenciar_evento(usuario, evento):

    return (
        usuario.is_superuser
        or usuario.tipo_usuario == 'administrador'
        or evento.organizador == usuario
    )


def detalhe_evento(request, evento_id):

    evento = get_object_or_404(
        Evento,
        id=evento_id,
        ativo=True
    )

    inscrito = False
    favoritado = False

    if request.user.is_authenticated:

        inscrito = evento.inscricoes.filter(
            estudante=request.user,
            status='confirmada'
        ).exists()

        if request.user.tipo_usuario == 'estudante':

            favoritado = Favorito.objects.filter(
                estudante=request.user,
                evento=evento
            ).exists()

    vagas_ocupadas = evento.inscricoes.filter(
        status='confirmada'
    ).count()

    vagas_disponiveis = max(
        evento.limite_vagas - vagas_ocupadas,
        0
    )

    inscricoes_abertas = (
        evento.ativo
        and timezone.now() <= evento.data_limite_inscricao
        and vagas_disponiveis > 0
    )

    contexto = {
        'evento': evento,
        'inscrito': inscrito,
        'favoritado': favoritado,
        'vagas_disponiveis': vagas_disponiveis,
        'inscricoes_abertas': inscricoes_abertas,
    }

    return render(
        request,
        'eventos/detalhe.html',
        contexto
    )


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

    if (
        request.user.is_superuser
        or request.user.tipo_usuario == 'administrador'
    ):

        eventos = Evento.objects.all().order_by(
            '-criado_em'
        )

    else:

        eventos = Evento.objects.filter(
            organizador=request.user
        ).order_by(
            '-criado_em'
        )

    total_eventos = eventos.count()

    total_inscricoes = sum(
        evento.inscricoes.filter(
            status='confirmada'
        ).count()
        for evento in eventos
    )

    return render(
        request,
        'eventos/painel_organizador.html',
        {
            'eventos': eventos,
            'total_eventos': total_eventos,
            'total_inscricoes': total_inscricoes,
        }
    )


@login_required
def criar_evento(request):

    if not (
        request.user.is_superuser
        or request.user.tipo_usuario in (
            'organizador',
            'administrador'
        )
    ):

        messages.error(
            request,
            'Somente organizadores podem criar eventos.'
        )

        return redirect('home')

    if request.method == 'POST':

        form = EventoForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            evento = form.save(
                commit=False
            )

            evento.organizador = request.user

            evento.save()

            messages.success(
                request,
                'Evento criado com sucesso!'
            )

            return redirect(
                'eventos:painel_organizador'
            )

    else:

        form = EventoForm()

    return render(
        request,
        'eventos/criar_evento.html',
        {
            'form': form
        }
    )


@login_required
def gerenciar_evento(request, evento_id):

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
            'Você não tem permissão para gerenciar este evento.'
        )

        return redirect(
            'eventos:painel_organizador'
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
            'estudante__first_name'
        )
    )

    total_inscritos = inscricoes.count()

    total_presentes = inscricoes.filter(
        presenca__confirmada=True
    ).count()

    return render(
        request,
        'eventos/gerenciar_evento.html',
        {
            'evento': evento,
            'inscricoes': inscricoes,
            'total_inscritos': total_inscritos,
            'total_presentes': total_presentes,
        }
    )


@login_required
def editar_evento(request, evento_id):

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
            'Você não tem permissão para editar este evento.'
        )

        return redirect(
            'eventos:painel_organizador'
        )

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

    else:

        form = EventoForm(
            instance=evento
        )

    return render(
        request,
        'eventos/editar_evento.html',
        {
            'form': form,
            'evento': evento
        }
    )


@login_required
def relatorio_evento(request, evento_id):

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
            'Você não tem permissão para acessar este relatório.'
        )

        return redirect(
            'eventos:painel_organizador'
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
            'estudante__last_name'
        )
    )

    total_inscritos = inscricoes.count()

    total_presentes = inscricoes.filter(
        presenca__confirmada=True
    ).count()

    total_ausentes = (
        total_inscritos
        - total_presentes
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

    certificados_emitidos = inscricoes.filter(
        presenca__confirmada=True,
        presenca__certificado__ativo=True
    ).count()

    return render(
        request,
        'eventos/relatorio_evento.html',
        {
            'evento': evento,
            'inscricoes': inscricoes,
            'total_inscritos': total_inscritos,
            'total_presentes': total_presentes,
            'total_ausentes': total_ausentes,
            'taxa_presenca': taxa_presenca,
            'certificados_emitidos': certificados_emitidos,
        }
    )


@login_required
def exportar_relatorio_csv(request, evento_id):

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
            'Você não tem permissão para exportar este relatório.'
        )

        return redirect(
            'eventos:painel_organizador'
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
            'estudante__last_name'
        )
    )

    response = HttpResponse(
        content_type='text/csv; charset=utf-8'
    )

    response['Content-Disposition'] = (
        f'attachment; '
        f'filename="relatorio_evento_{evento.id}.csv"'
    )

    response.write('\ufeff')

    writer = csv.writer(
        response,
        delimiter=';'
    )

    writer.writerow([
        'Nome',
        'E-mail',
        'Instituição',
        'Curso',
        'Matrícula',
        'Status da inscrição',
        'Presença',
        'Data da presença',
        'Certificado',
    ])

    for inscricao in inscricoes:

        estudante = inscricao.estudante
        presenca = inscricao.presenca

        nome = (
            estudante.get_full_name()
            or estudante.username
        )

        if presenca.confirmada:

            status_presenca = 'Presente'

            if presenca.data_confirmacao:

                data_presenca = (
                    presenca
                    .data_confirmacao
                    .strftime(
                        '%d/%m/%Y %H:%M'
                    )
                )

            else:

                data_presenca = ''

        else:

            status_presenca = 'Ausente'
            data_presenca = ''

        certificado_emitido = (
            'Sim'
            if (
                hasattr(
                    presenca,
                    'certificado'
                )
                and presenca.certificado.ativo
            )
            else 'Não'
        )

        writer.writerow([
            nome,
            estudante.email,
            estudante.instituicao,
            estudante.curso,
            estudante.matricula,
            inscricao.get_status_display(),
            status_presenca,
            data_presenca,
            certificado_emitido,
        ])

    return response


@login_required
def alterar_status_evento(request, evento_id):

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
            'Você não tem permissão para alterar este evento.'
        )

        return redirect(
            'eventos:painel_organizador'
        )

    if request.method == 'POST':

        evento.ativo = not evento.ativo
        evento.save()

        if evento.ativo:

            messages.success(
                request,
                'Evento reativado com sucesso!'
            )

        else:

            messages.success(
                request,
                'Evento desativado com sucesso!'
            )

    return redirect(
        'eventos:gerenciar',
        evento_id=evento.id
    )


@login_required
@somente_estudante
def alternar_favorito(request, evento_id):

    evento = get_object_or_404(
        Evento,
        id=evento_id
    )

    if request.method == 'POST':

        favorito = Favorito.objects.filter(
            estudante=request.user,
            evento=evento
        ).first()

        if favorito:

            favorito.delete()

            messages.success(
                request,
                'Evento removido dos favoritos.'
            )

        else:

            Favorito.objects.create(
                estudante=request.user,
                evento=evento
            )

            messages.success(
                request,
                'Evento salvo nos favoritos!'
            )

    return redirect(
        'eventos:detalhe',
        evento_id=evento.id
    )


@login_required
@somente_estudante
def meus_favoritos(request):

    favoritos = (
        Favorito.objects
        .filter(
            estudante=request.user,
            evento__ativo=True
        )
        .select_related(
            'evento'
        )
        .order_by(
            'evento__data_inicio'
        )
    )

    return render(
        request,
        'eventos/meus_favoritos.html',
        {
            'favoritos': favoritos
        }
    )