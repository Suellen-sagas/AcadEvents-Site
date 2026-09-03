import json
import secrets

from django.utils import timezone
from solders.signature import Signature
from django.contrib import messages
from django.contrib.auth import login, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from solders.pubkey import Pubkey

from .forms import (
    CadastroUsuarioForm,
    LoginUsuarioForm,
    PerfilUsuarioForm,
)
from .models import Usuario


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

            login(
                request,
                usuario
            )

            messages.success(
                request,
                'Conta criada com sucesso!'
            )

            return redirecionar_usuario(
                usuario
            )

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

            login(
                request,
                usuario
            )

            messages.success(
                request,
                'Login realizado com sucesso!'
            )

            return redirecionar_usuario(
                usuario
            )

    else:

        form = LoginUsuarioForm(
            request
        )

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


@login_required
@require_POST
def salvar_carteira_solana(request):

    try:
        dados = json.loads(
            request.body
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Dados inválidos.'
            },
            status=400
        )

    carteira = (
        dados
        .get('carteira', '')
        .strip()
    )

    if not carteira:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Carteira não informada.'
            },
            status=400
        )

    try:

        Pubkey.from_string(
            carteira
        )

    except ValueError:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Endereço Solana inválido.'
            },
            status=400
        )

    carteira_em_uso = (
        Usuario.objects
        .exclude(
            id=request.user.id
        )
        .filter(
            carteira_solana=carteira
        )
        .exists()
    )

    if carteira_em_uso:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Esta carteira já está vinculada '
                    'a outra conta.'
                )
            },
            status=400
        )

    request.user.carteira_solana = carteira

    # A carteira foi conectada, mas ainda
    # faremos a prova criptográfica de posse.
    request.user.carteira_solana_verificada = False

    request.user.save(
        update_fields=[
            'carteira_solana',
            'carteira_solana_verificada'
        ]
    )

    return JsonResponse(
        {
            'ok': True,
            'carteira': carteira
        }
    )


@login_required
@require_POST
def remover_carteira_solana(request):

    request.user.carteira_solana = None
    request.user.carteira_solana_verificada = False

    request.user.save(
        update_fields=[
            'carteira_solana',
            'carteira_solana_verificada'
        ]
    )

    return JsonResponse({
        'ok': True
    })

@login_required
@require_POST
def gerar_desafio_carteira(request):

    if not request.user.carteira_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Nenhuma carteira conectada.'
            },
            status=400
        )

    nonce = secrets.token_urlsafe(32)

    mensagem = (
        'AcadEvents - Verificação de Carteira Solana\n'
        f'Usuário: {request.user.id}\n'
        f'Carteira: {request.user.carteira_solana}\n'
        f'Nonce: {nonce}'
    )

    request.session[
        'solana_wallet_challenge'
    ] = {
        'mensagem': mensagem,
        'carteira': request.user.carteira_solana,
        'criado_em': timezone.now().timestamp()
    }

    return JsonResponse(
        {
            'ok': True,
            'mensagem': mensagem
        }
    )


@login_required
@require_POST
def verificar_carteira_solana(request):

    try:

        dados = json.loads(
            request.body
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Dados inválidos.'
            },
            status=400
        )

    carteira = dados.get(
        'carteira',
        ''
    ).strip()

    assinatura_hex = dados.get(
        'assinatura',
        ''
    ).strip()

    desafio = request.session.pop(
        'solana_wallet_challenge',
        None
    )

    if not desafio:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'A verificação expirou. '
                    'Tente novamente.'
                )
            },
            status=400
        )

    criado_em = desafio.get(
        'criado_em',
        0
    )

    agora = timezone.now().timestamp()

    if agora - criado_em > 300:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'A verificação expirou. '
                    'Tente novamente.'
                )
            },
            status=400
        )

    if (
        carteira
        != request.user.carteira_solana
        or carteira
        != desafio.get('carteira')
    ):

        return JsonResponse(
            {
                'ok': False,
                'erro': 'A carteira não corresponde.'
            },
            status=400
        )

    try:

        public_key = Pubkey.from_string(
            carteira
        )

        assinatura = Signature.from_bytes(
            bytes.fromhex(
                assinatura_hex
            )
        )

        mensagem = desafio[
            'mensagem'
        ].encode('utf-8')

        valida = assinatura.verify(
            public_key,
            mensagem
        )

    except (
        ValueError,
        TypeError,
        KeyError
    ):

        valida = False

    if not valida:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Não foi possível validar '
                    'a assinatura da carteira.'
                )
            },
            status=400
        )

    request.user.carteira_solana_verificada = True

    request.user.save(
        update_fields=[
            'carteira_solana_verificada'
        ]
    )

    return JsonResponse(
        {
            'ok': True
        }
    )