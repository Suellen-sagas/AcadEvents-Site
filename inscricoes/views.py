from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import (
    get_object_or_404,
    redirect,
    render,
)
from django.utils import timezone

from eventos.models import Evento
from usuarios.decorators import somente_estudante

from .models import Inscricao


@login_required
@somente_estudante
def realizar_inscricao(
    request,
    evento_id
):

    if request.method != 'POST':

        return redirect(
            'eventos:detalhe',
            evento_id=evento_id
        )

    try:

        with transaction.atomic():

            evento = (
                Evento.objects
                .select_for_update()
                .get(
                    id=evento_id,
                    ativo=True
                )
            )

            # =========================
            # PLANO FREE
            # =========================

            if not evento.permite_inscricoes:

                messages.error(
                    request,
                    (
                        'Este evento está disponível '
                        'apenas para divulgação.'
                    )
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )

            # =========================
            # PRAZO
            # =========================

            if (
                timezone.now()
                > evento.data_limite_inscricao
            ):

                messages.error(
                    request,
                    'O prazo de inscrição terminou.'
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )

            # =========================
            # INSCRIÇÃO EXISTENTE
            # =========================

            inscricao_existente = (
                Inscricao.objects
                .filter(
                    estudante=request.user,
                    evento=evento
                )
                .first()
            )

            if (
                inscricao_existente
                and inscricao_existente.status
                == 'confirmada'
            ):

                messages.info(
                    request,
                    'Você já está inscrito neste evento.'
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )

            if (
                inscricao_existente
                and inscricao_existente.status
                == 'espera'
            ):

                messages.info(
                    request,
                    (
                        'Você já está na lista '
                        'de espera deste evento.'
                    )
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )

            # =========================
            # QUANTIDADE DE VAGAS
            # =========================

            total_confirmados = (
                evento.inscricoes
                .filter(
                    status='confirmada'
                )
                .count()
            )

            # =========================
            # EVENTO LOTADO
            # LISTA DE ESPERA
            # =========================

            if (
                total_confirmados
                >= evento.limite_vagas
            ):

                if inscricao_existente:

                    inscricao_existente.status = (
                        'espera'
                    )

                    inscricao_existente.full_clean()

                    inscricao_existente.save(
                        update_fields=[
                            'status'
                        ]
                    )

                else:

                    inscricao = Inscricao(
                        estudante=request.user,
                        evento=evento,
                        status='espera'
                    )

                    inscricao.full_clean()

                    inscricao.save()

                messages.info(
                    request,
                    (
                        'O evento está lotado. '
                        'Você entrou na lista de espera.'
                    )
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )

            # =========================
            # CONFIRMA INSCRIÇÃO
            # =========================

            if inscricao_existente:

                inscricao_existente.status = (
                    'confirmada'
                )

                inscricao_existente.full_clean()

                inscricao_existente.save(
                    update_fields=[
                        'status'
                    ]
                )

            else:

                inscricao = Inscricao(
                    estudante=request.user,
                    evento=evento,
                    status='confirmada'
                )

                inscricao.full_clean()

                inscricao.save()

            messages.success(
                request,
                'Inscrição realizada com sucesso!'
            )

    except Evento.DoesNotExist:

        messages.error(
            request,
            'Evento não encontrado.'
        )

    except Exception:

        messages.error(
            request,
            (
                'Não foi possível realizar '
                'a inscrição.'
            )
        )

    return redirect(
        'eventos:detalhe',
        evento_id=evento_id
    )


@login_required
@somente_estudante
def meus_eventos(request):

    agora = timezone.now()

    inscricoes = (
        Inscricao.objects
        .filter(
            estudante=request.user,
            status='confirmada'
        )
        .select_related(
            'evento',
            'presenca'
        )
        .order_by(
            'evento__data_inicio'
        )
    )

    proximos_eventos = (
        inscricoes
        .filter(
            evento__data_fim__gte=agora
        )
    )

    eventos_concluidos = (
        inscricoes
        .filter(
            evento__data_fim__lt=agora
        )
        .order_by(
            '-evento__data_fim'
        )
    )

    contexto = {
        'proximos_eventos':
            proximos_eventos,

        'eventos_concluidos':
            eventos_concluidos,

        'total_inscricoes':
            inscricoes.count(),

        'total_proximos':
            proximos_eventos.count(),

        'total_concluidos':
            eventos_concluidos.count(),
    }

    return render(
        request,
        'inscricoes/meus_eventos.html',
        contexto
    )


@login_required
@somente_estudante
def cancelar_inscricao(
    request,
    inscricao_id
):

    inscricao = get_object_or_404(
        Inscricao.objects.select_related(
            'evento'
        ),
        id=inscricao_id,
        estudante=request.user
    )

    if request.method != 'POST':

        return redirect(
            'inscricoes:meus_eventos'
        )

    evento = inscricao.evento

    if timezone.now() >= evento.data_inicio:

        messages.error(
            request,
            (
                'Não é possível cancelar a inscrição '
                'após o início do evento.'
            )
        )

        return redirect(
            'inscricoes:meus_eventos'
        )

    if (
        hasattr(
            inscricao,
            'presenca'
        )
        and inscricao.presenca.confirmada
    ):

        messages.error(
            request,
            (
                'Não é possível cancelar uma inscrição '
                'com presença já confirmada.'
            )
        )

        return redirect(
            'inscricoes:meus_eventos'
        )

    inscricao.status = 'cancelada'

    inscricao.save(
        update_fields=[
            'status'
        ]
    )

    messages.success(
        request,
        'Inscrição cancelada com sucesso.'
    )

    return redirect(
        'inscricoes:meus_eventos'
    )