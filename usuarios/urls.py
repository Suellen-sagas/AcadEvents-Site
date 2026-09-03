from django.contrib.auth import views as auth_views
from django.urls import path

from . import views


urlpatterns = [
    path(
        'cadastro/',
        views.cadastro,
        name='cadastro'
    ),

    path(
        'login/',
        views.entrar,
        name='login'
    ),

    path(
        'logout/',
        auth_views.LogoutView.as_view(),
        name='logout'
    ),

    path(
        'perfil/',
        views.perfil,
        name='perfil'
    ),

    path(
        'alterar-senha/',
        views.alterar_senha,
        name='alterar_senha'
    ),

    # RECUPERAÇÃO DE SENHA

    path(
        'esqueci-senha/',
        auth_views.PasswordResetView.as_view(
            template_name='usuarios/esqueci_senha.html',
            email_template_name='usuarios/email_recuperacao_senha.html',
            subject_template_name='usuarios/assunto_recuperacao_senha.txt',
            success_url='/usuarios/esqueci-senha/enviado/'
        ),
        name='password_reset'
    ),

    path(
        'esqueci-senha/enviado/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='usuarios/esqueci_senha_enviado.html'
        ),
        name='password_reset_done'
    ),

    path(
        'redefinir-senha/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='usuarios/redefinir_senha.html',
            success_url='/usuarios/senha-alterada/'
        ),
        name='password_reset_confirm'
    ),

    path(
        'senha-alterada/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='usuarios/senha_alterada.html'
        ),
        name='password_reset_complete'
    ),

    path(
        'carteira-solana/salvar/',
        views.salvar_carteira_solana,
        
        name='salvar_carteira_solana'
),

path(
    'carteira-solana/remover/',
    views.remover_carteira_solana,
    
    name='remover_carteira_solana'
),
path(
    'carteira-solana/desafio/',
    views.gerar_desafio_carteira,
    name='gerar_desafio_carteira'
),

path(
    'carteira-solana/verificar/',
    views.verificar_carteira_solana,
    name='verificar_carteira_solana'
),

]