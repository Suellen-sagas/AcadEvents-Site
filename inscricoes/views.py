from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db import transaction
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone

from eventos.models import Evento
from usuarios.decorators import somente_estudante

from .models import Inscricao


@login_required
@somente_estudante
def realizar_inscricao(request, evento_id):

    if request.method != 'POST':
        return redirect(
            'eventos:detalhe',
            evento_id=evento_id
        )

    try:

        with transaction.atomic():

            # Bloqueia temporariamente este evento
            # enquanto a inscrição está sendo processada.
            evento = get_object_or_404(
                Evento.objects.select_for_update(),
                id=evento_id,
                ativo=True
            )

            # Verifica prazo de inscrição.
            if timezone.now() > evento.data_limite_inscricao:

                messages.error(
                    request,
                    'O prazo de inscrição deste evento já terminou.'
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )


            # Procura inscrição anterior do estudante.
            inscricao_existente = Inscricao.objects.filter(
                estudante=request.user,
                evento=evento
            ).first()


            # Já está inscrito.
            if (
                inscricao_existente
                and inscricao_existente.status == 'confirmada'
            ):

                messages.warning(
                    request,
                    'Você já está inscrito neste evento.'
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )


            # Conta somente inscrições válidas.
            total_inscritos = Inscricao.objects.filter(
                evento=evento,
                status='confirmada'
            ).count()


            # Confere vagas.
            if total_inscritos >= evento.limite_vagas:

                messages.error(
                    request,
                    'Não há mais vagas disponíveis para este evento.'
                )

                return redirect(
                    'eventos:detalhe',
                    evento_id=evento.id
                )


            # Se já existia uma inscrição cancelada,
            # reativa em vez de criar outra.
            if inscricao_existente:

                inscricao_existente.status = 'confirmada'

                try:
                    inscricao_existente.full_clean()
                    inscricao_existente.save()

                except ValidationError as erro:

                    messages.error(
                        request,
                        ' '.join(erro.messages)
                    )

                    return redirect(
                        'eventos:detalhe',
                        evento_id=evento.id
                    )


            # Caso contrário, cria nova inscrição.
            else:

                inscricao = Inscricao(
                    estudante=request.user,
                    evento=evento,
                    status='confirmada'
                )

                try:
                    inscricao.full_clean()
                    inscricao.save()

                except ValidationError as erro:

                    messages.error(
                        request,
                        ' '.join(erro.messages)
                    )

                    return redirect(
                        'eventos:detalhe',
                        evento_id=evento.id
                    )


        messages.success(
            request,
            'Inscrição realizada com sucesso!'
        )


    except Exception:

        messages.error(
            request,
            'Não foi possível concluir sua inscrição. Tente novamente.'
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

    proximos_eventos = inscricoes.filter(
        evento__data_fim__gte=agora
    )

    eventos_concluidos = inscricoes.filter(
        evento__data_fim__lt=agora
    ).order_by(
        '-evento__data_fim'
    )

    contexto = {
        'proximos_eventos': proximos_eventos,
        'eventos_concluidos': eventos_concluidos,
        'total_inscricoes': inscricoes.count(),
        'total_proximos': proximos_eventos.count(),
        'total_concluidos': eventos_concluidos.count(),
    }

    return render(
        request,
        'inscricoes/meus_eventos.html',
        contexto
    )


@login_required
@somente_estudante
def cancelar_inscricao(request, inscricao_id):

    inscricao = get_object_or_404(
        Inscricao,
        id=inscricao_id,
        estudante=request.user,
        status='confirmada'
    )

    evento = inscricao.evento

    if request.method != 'POST':

        return redirect(
            'inscricoes:meus_eventos'
        )

    if timezone.now() >= evento.data_inicio:

        messages.error(
            request,
            'Não é possível cancelar a inscrição após o início do evento.'
        )

        return redirect(
            'inscricoes:meus_eventos'
        )

    if (
        hasattr(inscricao, 'presenca')
        and inscricao.presenca.confirmada
    ):

        messages.error(
            request,
            'Não é possível cancelar uma inscrição '
            'com presença já confirmada.'
        )

        return redirect(
            'inscricoes:meus_eventos'
        )

    inscricao.status = 'cancelada'
    inscricao.save()

    messages.success(
        request,
        'Inscrição cancelada com sucesso.'
    )

    return redirect(
        'inscricoes:meus_eventos'
    )