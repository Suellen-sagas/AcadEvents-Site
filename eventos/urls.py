from django.urls import path

from . import views


app_name = 'eventos'


urlpatterns = [
    path(
        'painel/',
        views.painel_organizador,
        name='painel_organizador'
    ),

    path(
        'criar/',
        views.criar_evento,
        name='criar'
    ),

    path(
        'favoritos/',
        views.meus_favoritos,
        name='favoritos'
    ),

    path(
        '<int:evento_id>/gerenciar/',
        views.gerenciar_evento,
        name='gerenciar'
    ),

    path(
        '<int:evento_id>/editar/',
        views.editar_evento,
        name='editar'
    ),

    path(
        '<int:evento_id>/relatorio/',
        views.relatorio_evento,
        name='relatorio'
    ),

    path(
        '<int:evento_id>/relatorio/exportar/',
        views.exportar_relatorio_csv,
        name='exportar_relatorio'
    ),

    path(
        '<int:evento_id>/status/',
        views.alterar_status_evento,
        name='alterar_status'
    ),

    path(
        '<int:evento_id>/favoritar/',
        views.alternar_favorito,
        name='favoritar'
    ),

    path(
        '<int:evento_id>/',
        views.detalhe_evento,
        name='detalhe'
    ),
]