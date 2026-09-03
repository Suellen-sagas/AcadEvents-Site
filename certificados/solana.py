import json
import urllib.error
import urllib.request

from django.conf import settings
from solders.signature import Signature
from django.utils import timezone
from django.views.decorators.http import require_POST
from .solana import consultar_transacao_solana


def consultar_transacao_solana(
    assinatura,
    memo_esperado,
    carteira_esperada
):

    # Valida o formato da assinatura Solana
    try:
        Signature.from_string(assinatura)
    except ValueError:
        return False, 'Assinatura Solana inválida.'


    payload = {
        'jsonrpc': '2.0',
        'id': 1,
        'method': 'getTransaction',
        'params': [
            assinatura,
            {
                'commitment': 'confirmed',
                'encoding': 'jsonParsed',
                'maxSupportedTransactionVersion': 0,
            }
        ]
    }


    request = urllib.request.Request(
        settings.SOLANA_RPC_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json'
        },
        method='POST'
    )


    try:

        with urllib.request.urlopen(
            request,
            timeout=15
        ) as response:

            dados = json.loads(
                response.read().decode('utf-8')
            )

    except (
        urllib.error.URLError,
        TimeoutError,
        json.JSONDecodeError
    ):

        return (
            False,
            'Não foi possível consultar a Solana.'
        )


    transacao = dados.get('result')

    if not transacao:

        return (
            False,
            'Transação ainda não encontrada ou confirmada.'
        )


    meta = transacao.get('meta')

    if not meta:

        return (
            False,
            'A transação não possui metadados.'
        )


    if meta.get('err') is not None:

        return (
            False,
            'A transação falhou na Solana.'
        )


    # =========================
    # CONFERE O MEMO
    # =========================

    logs = meta.get(
        'logMessages'
    ) or []

    memo_encontrado = any(
        memo_esperado in log
        for log in logs
    )

    if not memo_encontrado:

        return (
            False,
            'O hash deste certificado não foi encontrado na transação.'
        )


    # =========================
    # CONFERE A CARTEIRA
    # =========================

    try:

        account_keys = (
            transacao[
                'transaction'
            ][
                'message'
            ][
                'accountKeys'
            ]
        )

    except (
        KeyError,
        TypeError
    ):

        return (
            False,
            'Não foi possível identificar os signatários.'
        )


    carteira_assinou = any(
        conta.get('pubkey') == carteira_esperada
        and conta.get('signer') is True
        for conta in account_keys
        if isinstance(conta, dict)
    )


    if not carteira_assinou:

        return (
            False,
            'A transação não foi assinada pela carteira vinculada ao usuário.'
        )


    return True, None