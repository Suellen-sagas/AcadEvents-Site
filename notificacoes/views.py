from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from .models import Notificacao


@login_required
def lista_notificacoes(request):

    notificacoes = Notificacao.objects.filter(
        usuario=request.user
    )

    return render(
        request,
        'notificacoes/lista.html',
        {
            'notificacoes': notificacoes
        }
    )


@login_required
def marcar_como_lida(request, notificacao_id):

    notificacao = get_object_or_404(
        Notificacao,
        id=notificacao_id,
        usuario=request.user
    )

    if request.method == 'POST':
        notificacao.lida = True
        notificacao.save()

    return redirect('notificacoes:lista')


@login_required
def marcar_todas_como_lidas(request):

    if request.method == 'POST':

        Notificacao.objects.filter(
            usuario=request.user,
            lida=False
        ).update(lida=True)

    return redirect('notificacoes:lista')