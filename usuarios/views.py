from django.contrib import messages
from django.contrib.auth import login, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render, redirect

from .forms import (
    CadastroUsuarioForm,
    LoginUsuarioForm,
    PerfilUsuarioForm,
)


def redirecionar_usuario(usuario):
    if usuario.is_superuser or usuario.tipo_usuario == 'administrador':
        return redirect('/admin/')

    if usuario.tipo_usuario == 'organizador':
        return redirect('eventos:painel_organizador')

    return redirect('home')


def cadastro(request):
    if request.user.is_authenticated:
        return redirecionar_usuario(request.user)

    if request.method == 'POST':
        form = CadastroUsuarioForm(request.POST)

        if form.is_valid():
            usuario = form.save()

            login(request, usuario)

            messages.success(
                request,
                'Conta criada com sucesso!'
            )

            return redirecionar_usuario(usuario)

    else:
        form = CadastroUsuarioForm()

    return render(
        request,
        'usuarios/cadastro.html',
        {
            'form': form
        }
    )


def entrar(request):
    if request.user.is_authenticated:
        return redirecionar_usuario(request.user)

    if request.method == 'POST':
        form = LoginUsuarioForm(
            request,
            data=request.POST
        )

        if form.is_valid():
            usuario = form.get_user()

            login(request, usuario)

            messages.success(
                request,
                'Login realizado com sucesso!'
            )

            return redirecionar_usuario(usuario)

    else:
        form = LoginUsuarioForm(request)

    return render(
        request,
        'usuarios/login.html',
        {
            'form': form
        }
    )


@login_required
def perfil(request):
    if request.method == 'POST':
        form = PerfilUsuarioForm(
            request.POST,
            instance=request.user
        )

        if form.is_valid():
            form.save()

            messages.success(
                request,
                'Perfil atualizado com sucesso!'
            )

            return redirect('perfil')

    else:
        form = PerfilUsuarioForm(
            instance=request.user
        )

    return render(
        request,
        'usuarios/perfil.html',
        {
            'form': form
        }
    )


@login_required
def alterar_senha(request):
    if request.method == 'POST':
        form = PasswordChangeForm(
            request.user,
            request.POST
        )

        if form.is_valid():
            usuario = form.save()

            update_session_auth_hash(
                request,
                usuario
            )

            messages.success(
                request,
                'Senha alterada com sucesso!'
            )

            return redirect('perfil')

    else:
        form = PasswordChangeForm(
            request.user
        )

    return render(
        request,
        'usuarios/alterar_senha.html',
        {
            'form': form
        }
    )