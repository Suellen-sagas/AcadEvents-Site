def notificacoes_nao_lidas(request):

    if request.user.is_authenticated:

        quantidade = request.user.notificacoes.filter(
            lida=False
        ).count()

    else:
        quantidade = 0

    return {
        'notificacoes_nao_lidas': quantidade
    }