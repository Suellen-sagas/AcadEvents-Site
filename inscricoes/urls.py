from django.urls import path
from . import views


app_name = 'inscricoes'


urlpatterns = [
    path(
        'evento/<int:evento_id>/',
        views.realizar_inscricao,
        name='realizar'
    ),
    path(
    'meus-eventos/',
    views.meus_eventos,
    name='meus_eventos'
    ),

    path(
    'cancelar/<int:inscricao_id>/',
    views.cancelar_inscricao,
    name='cancelar'
    ),
]