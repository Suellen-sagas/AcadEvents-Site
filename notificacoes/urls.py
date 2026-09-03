from django.urls import path

from . import views


app_name = 'notificacoes'


urlpatterns = [
    path(
        '',
        views.lista_notificacoes,
        name='lista'
    ),

    path(
        '<int:notificacao_id>/lida/',
        views.marcar_como_lida,
        name='marcar_lida'
    ),

    path(
        'marcar-todas/',
        views.marcar_todas_como_lidas,
        name='marcar_todas'
    ),
]