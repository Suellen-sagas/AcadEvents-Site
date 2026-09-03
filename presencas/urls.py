from django.urls import path

from . import views


app_name = 'presencas'


urlpatterns = [
    path(
        'qr/<int:inscricao_id>/',
        views.qr_presenca,
        name='qr'
    ),

    path(
        'validar/<uuid:codigo_qr>/',
        views.validar_presenca,
        name='validar'
    ),

    path(
        'confirmar/<int:inscricao_id>/',
        views.confirmar_presenca_manual,
        name='confirmar_manual'
    ),
]