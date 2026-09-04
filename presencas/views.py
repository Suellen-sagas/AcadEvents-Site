import io

import qrcode

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import (
    get_object_or_404,
    redirect,
    render,
)
from django.urls import reverse

from eventos.models import Evento
from inscricoes.models import Inscricao
from usuarios.decorators import somente_estudante

from .models import Presenca


# =========================================================
# AUXILIAR
# =========================================================

def pode_gerenciar_evento(
    usuario,
    evento
):

    return (
        usuario.is_superuser
        or usuario.tipo_usuario == 'administrador'
        or evento.organizador == usuario
    )


# =========================================================
# QR CODE DO ESTUDANTE
# =========================================================

@login_required
@somente_estudante
def qr_presenca(
    request,
    inscricao_id
):

    inscricao = get_object_or_404(
        Inscricao.objects.select_related(
            'evento'
        ),
        id=inscricao_id,
        estudante=request.user,
        status='confirmada'
    )

    evento = inscricao.evento

    if not evento.permite_qr_code:

        messages.error(
            request,
            (
                'O plano deste evento não '
                'possui QR Code.'
            )
        )

        return redirect(
            'inscricoes:meus_eventos'
        )

    presenca, _ = (
        Presenca.objects.get_or_create(
            inscricao=inscricao
        )
    )

    url_validacao = (
        request.build_absolute_uri(
            reverse(
                'presencas:validar',
                args=[
                    presenca.codigo_qr
                ]
            )
        )
    )

    imagem = qrcode.make(
        url_validacao
    )

    buffer = io.BytesIO()

    imagem.save(
        buffer,
        format='PNG'
    )

    buffer.seek(0)

    return HttpResponse(
        buffer.getvalue(),
        content_type='image/png'
    )


# =========================================================
# LEITOR DE QR CODE
# =========================================================

@login_required
def leitor_qr(
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
                'para validar presenças deste evento.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    if not evento.permite_qr_code:

        messages.error(
            request,
            (
                'O plano deste evento não '
                'possui leitura de QR Code.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    if not evento.permite_presenca:

        messages.error(
            request,
            (
                'O plano deste evento não '
                'possui controle de presença.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    return render(
        request,
        'presencas/leitor_qr.html',
        {
            'evento': evento
        }
    )


# =========================================================
# VALIDAR QR CODE
# =========================================================

@login_required
def validar_presenca(
    request,
    codigo_qr
):

    presenca = get_object_or_404(
        Presenca.objects.select_related(
            'inscricao__evento',
            'inscricao__estudante'
        ),
        codigo_qr=codigo_qr
    )

    inscricao = (
        presenca.inscricao
    )

    evento = (
        inscricao.evento
    )

    # =====================================================
    # PERMISSÃO
    # =====================================================

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para validar esta presença.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    # =====================================================
    # PLANO
    # =====================================================

    if not evento.permite_presenca:

        messages.error(
            request,
            (
                'O plano deste evento não '
                'possui controle de presença.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    # =====================================================
    # INSCRIÇÃO CANCELADA / NÃO CONFIRMADA
    # =====================================================

    if inscricao.status != 'confirmada':

        messages.error(
            request,
            (
                'Esta inscrição não está '
                'confirmada.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    # =====================================================
    # CONFIRMAR
    # =====================================================

    if request.method == 'POST':

        if presenca.confirmada:

            messages.info(
                request,
                (
                    'A presença deste participante '
                    'já estava confirmada.'
                )
            )

        else:

            presenca.confirmada = True

            presenca.save()

            messages.success(
                request,
                'Presença confirmada com sucesso!'
            )

        return redirect(
            'presencas:leitor',
            evento_id=evento.id
        )

    return render(
        request,
        'presencas/validar.html',
        {
            'presenca': presenca,
            'inscricao': inscricao,
            'evento': evento,
        }
    )


# =========================================================
# CONFIRMAR PRESENÇA MANUALMENTE
# =========================================================

@login_required
def confirmar_presenca_manual(
    request,
    inscricao_id
):

    inscricao = get_object_or_404(
        Inscricao.objects.select_related(
            'evento',
            'estudante'
        ),
        id=inscricao_id,
        status='confirmada'
    )

    evento = (
        inscricao.evento
    )

    if not pode_gerenciar_evento(
        request.user,
        evento
    ):

        messages.error(
            request,
            (
                'Você não possui permissão '
                'para confirmar esta presença.'
            )
        )

        return redirect(
            'eventos:painel_organizador'
        )

    if not evento.permite_presenca:

        messages.error(
            request,
            (
                'O plano deste evento não '
                'possui controle de presença.'
            )
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    if request.method != 'POST':

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    presenca, _ = (
        Presenca.objects.get_or_create(
            inscricao=inscricao
        )
    )

    if presenca.confirmada:

        messages.info(
            request,
            (
                'A presença deste participante '
                'já estava confirmada.'
            )
        )

    else:

        presenca.confirmada = True

        presenca.save()

        messages.success(
            request,
            (
                'Presença de '
                f'{inscricao.estudante} '
                'confirmada com sucesso!'
            )
        )

    return redirect(
        'eventos:gerenciar',
        evento_id=evento.id
    )