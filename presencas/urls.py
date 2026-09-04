from django.urls import path

from . import views


app_name = 'presencas'


urlpatterns = [

    # QR CODE DO ALUNO

    path(
        'qr/<int:inscricao_id>/',
        views.qr_presenca,
        name='qr'
    ),


    # LEITOR DE QR CODE DO ORGANIZADOR

    path(
        'evento/<int:evento_id>/leitor/',
        views.leitor_qr,
        name='leitor'
    ),


    # VALIDAÇÃO DO QR CODE

    path(
        'validar/<uuid:codigo_qr>/',
        views.validar_presenca,
        name='validar'
    ),


    # CONFIRMAÇÃO MANUAL

    path(
        'confirmar/<int:inscricao_id>/',
        views.confirmar_presenca_manual,
        name='confirmar'
    ),

]