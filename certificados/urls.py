from django.urls import path
from . import views


app_name = 'certificados'


urlpatterns = [

    path(
        'meus-certificados/',
        views.meus_certificados,
        name='meus_certificados'
    ),

    path(
        'baixar/<int:certificado_id>/',
        views.baixar_certificado,
        name='baixar'
    ),

    path(
        'validar/<uuid:codigo_validacao>/',
        views.validar_certificado,
        name='validar'
    ),

]
