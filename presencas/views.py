from io import BytesIO

import qrcode

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse

from inscricoes.models import Inscricao

from .models import Presenca


@login_required
def qr_presenca(request, inscricao_id):

    inscricao = get_object_or_404(
        Inscricao,
        id=inscricao_id,
        estudante=request.user,
        status='confirmada'
    )

    presenca, created = Presenca.objects.get_or_create(
        inscricao=inscricao
    )

    url_validacao = reverse(
        'presencas:validar',
        args=[presenca.codigo_qr]
    )

    url_completa = request.build_absolute_uri(
        url_validacao
    )

    qr = qrcode.make(url_completa)

    buffer = BytesIO()

    qr.save(
        buffer,
        format='PNG'
    )

    buffer.seek(0)

    return HttpResponse(
        buffer.getvalue(),
        content_type='image/png'
    )


@login_required
def validar_presenca(request, codigo_qr):

    presenca = get_object_or_404(
        Presenca.objects.select_related(
            'inscricao',
            'inscricao__estudante',
            'inscricao__evento',
            'inscricao__evento__organizador'
        ),
        codigo_qr=codigo_qr
    )

    inscricao = presenca.inscricao
    evento = inscricao.evento

    if (
        request.user.tipo_usuario != 'administrador'
        and evento.organizador != request.user
    ):
        messages.error(
            request,
            'Você não possui permissão para validar a presença deste evento.'
        )

        return redirect('home')

    if inscricao.status != 'confirmada':
        messages.error(
            request,
            'Esta inscrição não está ativa.'
        )

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    if request.method == 'POST':

        if presenca.confirmada:

            messages.warning(
                request,
                'A presença deste participante já foi confirmada.'
            )

        else:

            presenca.confirmada = True
            presenca.save()

            messages.success(
                request,
                'Presença confirmada com sucesso!'
            )

        return redirect(
            'presencas:validar',
            codigo_qr=presenca.codigo_qr
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


@login_required
def confirmar_presenca_manual(request, inscricao_id):

    inscricao = get_object_or_404(
        Inscricao.objects.select_related(
            'evento',
            'estudante'
        ),
        id=inscricao_id,
        status='confirmada'
    )

    evento = inscricao.evento

    if (
        request.user.tipo_usuario != 'administrador'
        and evento.organizador != request.user
    ):
        messages.error(
            request,
            'Você não possui permissão para confirmar esta presença.'
        )

        return redirect('home')

    if request.method != 'POST':

        return redirect(
            'eventos:gerenciar',
            evento_id=evento.id
        )

    presenca, created = Presenca.objects.get_or_create(
        inscricao=inscricao
    )

    if presenca.confirmada:

        messages.warning(
            request,
            'A presença deste participante já está confirmada.'
        )

    else:

        presenca.confirmada = True
        presenca.save()

        messages.success(
            request,
            'Presença confirmada com sucesso!'
        )

    return redirect(
        'eventos:gerenciar',
        evento_id=evento.id
    )