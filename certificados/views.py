import json

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.http import require_GET, require_POST

from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

from usuarios.decorators import somente_estudante

from .models import Certificado
from .solana import consultar_transacao_solana


# =========================================================
# FUNÇÕES AUXILIARES DO PDF
# =========================================================

def desenhar_texto_centralizado(
    pdf,
    texto,
    x,
    y,
    fonte='Helvetica',
    tamanho=12,
    largura_maxima=None,
    tamanho_minimo=8
):
    """
    Desenha um texto centralizado e reduz a fonte automaticamente
    quando o conteúdo for maior que o espaço disponível.
    """

    texto = str(texto or '')

    tamanho_atual = tamanho

    if largura_maxima:

        while (
            stringWidth(
                texto,
                fonte,
                tamanho_atual
            ) > largura_maxima
            and tamanho_atual > tamanho_minimo
        ):
            tamanho_atual -= 1

    pdf.setFont(
        fonte,
        tamanho_atual
    )

    pdf.drawCentredString(
        x,
        y,
        texto
    )


def desenhar_logo_evento(
    pdf,
    evento,
    largura_pagina,
    altura_pagina
):
    """
    Exibe a logo cadastrada pelo organizador no certificado.
    Caso não exista ou ocorra algum problema com o arquivo,
    o certificado continua sendo gerado normalmente.
    """

    if not evento.logo_certificado:
        return

    try:

        caminho_logo = (
            evento.logo_certificado.path
        )

        imagem = ImageReader(
            caminho_logo
        )

        largura_original, altura_original = (
            imagem.getSize()
        )

        largura_maxima = 130
        altura_maxima = 60

        escala = min(
            largura_maxima / largura_original,
            altura_maxima / altura_original
        )

        largura_logo = (
            largura_original * escala
        )

        altura_logo = (
            altura_original * escala
        )

        x = (
            largura_pagina
            - 65
            - largura_logo
        )

        y = (
            altura_pagina
            - 70
            - altura_logo
        )

        pdf.drawImage(
            imagem,
            x,
            y,
            width=largura_logo,
            height=altura_logo,
            preserveAspectRatio=True,
            mask='auto'
        )

    except Exception:
        # Se a logo estiver com algum problema,
        # não impede a emissão do certificado.
        pass


# =========================================================
# MEUS CERTIFICADOS
# =========================================================

@login_required
@somente_estudante
def meus_certificados(request):

    certificados = (
        Certificado.objects
        .filter(
            presenca__inscricao__estudante=request.user,
            presenca__inscricao__status='confirmada',
            presenca__confirmada=True,
            ativo=True
        )
        .select_related(
            'presenca',
            'presenca__inscricao',
            'presenca__inscricao__evento'
        )
        .order_by(
            '-data_emissao'
        )
    )

    return render(
        request,
        'certificados/meus_certificados.html',
        {
            'certificados': certificados
        }
    )


# =========================================================
# BAIXAR CERTIFICADO
# =========================================================

@login_required
@somente_estudante
def baixar_certificado(
    request,
    certificado_id
):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca',
            'presenca__inscricao',
            'presenca__inscricao__estudante',
            'presenca__inscricao__evento',
            'presenca__inscricao__evento__plano'
        ),
        id=certificado_id,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada',
        presenca__inscricao__estudante=request.user
    )

    inscricao = (
        certificado.presenca.inscricao
    )

    evento = (
        inscricao.evento
    )

    estudante = (
        inscricao.estudante
    )


    # =====================================================
    # DADOS DO PARTICIPANTE
    # =====================================================

    nome_estudante = (
        estudante.get_full_name()
        or estudante.username
    )

    cpf = (
        estudante.cpf
        or 'Não informado'
    )

    instituicao = (
        estudante.instituicao
        or 'Não informada'
    )

    curso = (
        estudante.curso
        or 'Não informado'
    )

    matricula = (
        estudante.matricula
        or 'Não informada'
    )


    # =====================================================
    # RESPOSTA PDF
    # =====================================================

    response = HttpResponse(
        content_type='application/pdf'
    )

    response[
        'Content-Disposition'
    ] = (
        f'attachment; '
        f'filename="certificado_{certificado.id}.pdf"'
    )


    pagina = landscape(
        A4
    )

    largura, altura = (
        pagina
    )


    pdf = canvas.Canvas(
        response,
        pagesize=pagina
    )


    # =====================================================
    # FUNDO
    # =====================================================

    pdf.setFillColorRGB(
        0.035,
        0.035,
        0.055
    )

    pdf.rect(
        0,
        0,
        largura,
        altura,
        fill=1,
        stroke=0
    )


    # =====================================================
    # ELEMENTOS DECORATIVOS
    # =====================================================

    pdf.setFillColorRGB(
        0.12,
        0.06,
        0.23
    )

    pdf.circle(
        70,
        altura - 60,
        130,
        fill=1,
        stroke=0
    )


    pdf.setFillColorRGB(
        0.07,
        0.06,
        0.12
    )

    pdf.circle(
        largura - 30,
        20,
        170,
        fill=1,
        stroke=0
    )


    # =====================================================
    # BORDA EXTERNA
    # =====================================================

    pdf.setStrokeColorRGB(
        0.49,
        0.23,
        0.93
    )

    pdf.setLineWidth(
        2.5
    )

    pdf.rect(
        28,
        28,
        largura - 56,
        altura - 56,
        fill=0,
        stroke=1
    )


    # BORDA INTERNA

    pdf.setStrokeColorRGB(
        0.20,
        0.16,
        0.30
    )

    pdf.setLineWidth(
        0.8
    )

    pdf.rect(
        36,
        36,
        largura - 72,
        altura - 72,
        fill=0,
        stroke=1
    )


    # =====================================================
    # MARCA ACADEVENTS
    # =====================================================

    pdf.setFillColorRGB(
        0.66,
        0.52,
        1
    )

    pdf.setFont(
        'Helvetica-Bold',
        17
    )

    pdf.drawString(
        65,
        altura - 78,
        'ACADEVENTS'
    )


    pdf.setFillColorRGB(
        0.50,
        0.50,
        0.57
    )

    pdf.setFont(
        'Helvetica',
        7
    )

    pdf.drawString(
        65,
        altura - 91,
        'EVENTOS • TECNOLOGIA • CONEXÕES'
    )


    # =====================================================
    # LOGO DO ORGANIZADOR
    # =====================================================

    desenhar_logo_evento(
        pdf,
        evento,
        largura,
        altura
    )


    # =====================================================
    # TÍTULO
    # =====================================================

    pdf.setFillColorRGB(
        1,
        1,
        1
    )

    pdf.setFont(
        'Helvetica-Bold',
        31
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 135,
        'CERTIFICADO'
    )


    pdf.setFillColorRGB(
        0.55,
        0.42,
        0.95
    )

    pdf.setLineWidth(
        2
    )

    pdf.line(
        largura / 2 - 42,
        altura - 149,
        largura / 2 + 42,
        altura - 149
    )


    # =====================================================
    # TEXTO INTRODUTÓRIO
    # =====================================================

    pdf.setFillColorRGB(
        0.72,
        0.72,
        0.78
    )

    pdf.setFont(
        'Helvetica',
        12
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 180,
        'Certificamos que'
    )


    # =====================================================
    # NOME DO PARTICIPANTE
    # =====================================================

    pdf.setFillColorRGB(
        0.72,
        0.60,
        1
    )

    desenhar_texto_centralizado(
        pdf=pdf,
        texto=nome_estudante,
        x=largura / 2,
        y=altura - 218,
        fonte='Helvetica-Bold',
        tamanho=24,
        largura_maxima=largura - 170,
        tamanho_minimo=15
    )


    # =====================================================
    # DADOS PESSOAIS
    # =====================================================

    pdf.setFillColorRGB(
        0.64,
        0.64,
        0.70
    )

    desenhar_texto_centralizado(
        pdf,
        f'CPF: {cpf}',
        largura / 2,
        altura - 243,
        'Helvetica',
        9,
        largura - 180
    )


    # =====================================================
    # DADOS ACADÊMICOS
    # =====================================================

    texto_academico = (
        f'{curso} • {instituicao}'
    )

    pdf.setFillColorRGB(
        0.72,
        0.72,
        0.78
    )

    desenhar_texto_centralizado(
        pdf,
        texto_academico,
        largura / 2,
        altura - 262,
        'Helvetica',
        9,
        largura - 170
    )


    if estudante.matricula:

        pdf.setFillColorRGB(
            0.52,
            0.52,
            0.58
        )

        desenhar_texto_centralizado(
            pdf,
            f'Matrícula: {matricula}',
            largura / 2,
            altura - 279,
            'Helvetica',
            8,
            largura - 170
        )


    # =====================================================
    # PARTICIPAÇÃO
    # =====================================================

    pdf.setFillColorRGB(
        0.72,
        0.72,
        0.78
    )

    pdf.setFont(
        'Helvetica',
        11
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 310,
        'participou do evento'
    )


    # =====================================================
    # NOME DO EVENTO
    # =====================================================

    pdf.setFillColorRGB(
        1,
        1,
        1
    )

    desenhar_texto_centralizado(
        pdf=pdf,
        texto=evento.titulo,
        x=largura / 2,
        y=altura - 342,
        fonte='Helvetica-Bold',
        tamanho=18,
        largura_maxima=largura - 160,
        tamanho_minimo=11
    )


    # =====================================================
    # DATA E CARGA HORÁRIA
    # =====================================================

    data_evento = (
        evento.data_inicio.strftime(
            '%d/%m/%Y'
        )
    )

    texto_evento = (
        f'Realizado em {data_evento}, '
        f'com carga horária de '
        f'{evento.carga_horaria} hora(s).'
    )


    pdf.setFillColorRGB(
        0.68,
        0.68,
        0.73
    )

    desenhar_texto_centralizado(
        pdf,
        texto_evento,
        largura / 2,
        altura - 370,
        'Helvetica',
        10,
        largura - 160
    )


    # =====================================================
    # LINHA
    # =====================================================

    pdf.setStrokeColorRGB(
        0.16,
        0.15,
        0.22
    )

    pdf.setLineWidth(
        0.8
    )

    pdf.line(
        70,
        175,
        largura - 70,
        175
    )


    # =====================================================
    # BLOCO DE VALIDAÇÃO
    # =====================================================

    pdf.setFillColorRGB(
        0.48,
        0.48,
        0.55
    )

    pdf.setFont(
        'Helvetica-Bold',
        7
    )

    pdf.drawString(
        70,
        153,
        'VALIDAÇÃO DO CERTIFICADO'
    )


    pdf.setFont(
        'Helvetica',
        7
    )

    pdf.setFillColorRGB(
        0.62,
        0.62,
        0.68
    )

    pdf.drawString(
        70,
        138,
        f'Código: {certificado.codigo_validacao}'
    )


    # URL DE VALIDAÇÃO

    url_validacao = (
        request.build_absolute_uri(
            reverse(
                'certificados:validar',
                args=[
                    certificado.codigo_validacao
                ]
            )
        )
    )


    pdf.setFillColorRGB(
        0.48,
        0.48,
        0.54
    )

    pdf.setFont(
        'Helvetica',
        6.5
    )

    pdf.drawString(
        70,
        123,
        url_validacao
    )


    # =====================================================
    # BLOCO SOLANA
    # =====================================================

    x_solana = (
        largura / 2 + 80
    )


    pdf.setFillColorRGB(
        0.48,
        0.48,
        0.55
    )

    pdf.setFont(
        'Helvetica-Bold',
        7
    )

    pdf.drawString(
        x_solana,
        153,
        'BLOCKCHAIN • SOLANA'
    )


    if certificado.registrado_solana:

        pdf.setFillColorRGB(
            0.08,
            0.85,
            0.55
        )

        pdf.setFont(
            'Helvetica-Bold',
            8
        )

        pdf.drawString(
            x_solana,
            137,
            '✓ REGISTRADO NA SOLANA'
        )

    else:

        pdf.setFillColorRGB(
            0.65,
            0.65,
            0.70
        )

        pdf.setFont(
            'Helvetica-Bold',
            8
        )

        pdf.drawString(
            x_solana,
            137,
            'NÃO REGISTRADO NA SOLANA'
        )


    # HASH

    if certificado.hash_certificado:

        hash_curto = (
            f'{certificado.hash_certificado[:16]}'
            f'...'
            f'{certificado.hash_certificado[-12:]}'
        )

        pdf.setFillColorRGB(
            0.55,
            0.55,
            0.61
        )

        pdf.setFont(
            'Helvetica',
            6.5
        )

        pdf.drawString(
            x_solana,
            122,
            f'Hash: {hash_curto}'
        )


    # TRANSAÇÃO

    if (
        certificado.registrado_solana
        and certificado.assinatura_solana
    ):

        tx_curta = (
            f'{certificado.assinatura_solana[:13]}'
            f'...'
            f'{certificado.assinatura_solana[-10:]}'
        )

        pdf.drawString(
            x_solana,
            108,
            f'Transação: {tx_curta}'
        )


    # REDE

    pdf.setFillColorRGB(
        0.42,
        0.42,
        0.48
    )

    pdf.setFont(
        'Helvetica',
        6.5
    )

    pdf.drawString(
        x_solana,
        94,
        f'Rede: {certificado.rede_solana}'
    )


    # =====================================================
    # RODAPÉ
    # =====================================================

    pdf.setFillColorRGB(
        0.35,
        0.35,
        0.40
    )

    pdf.setFont(
        'Helvetica',
        6.5
    )

    pdf.drawCentredString(
        largura / 2,
        52,
        (
            'Documento emitido digitalmente pelo AcadEvents. '
            'A autenticidade pode ser verificada pelo código acima.'
        )
    )


    pdf.showPage()

    pdf.save()

    return response


# =========================================================
# VALIDAÇÃO PÚBLICA
# =========================================================

def validar_certificado(
    request,
    codigo_validacao
):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca',
            'presenca__inscricao',
            'presenca__inscricao__estudante',
            'presenca__inscricao__evento'
        ),
        codigo_validacao=codigo_validacao,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada'
    )

    return render(
        request,
        'certificados/validar.html',
        {
            'certificado': certificado
        }
    )


# =========================================================
# DADOS PARA REGISTRO NA SOLANA
# =========================================================

@login_required
@somente_estudante
@require_GET
def dados_registro_solana(
    request,
    certificado_id
):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca__inscricao__estudante',
            'presenca__inscricao__evento'
        ),
        id=certificado_id,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada',
        presenca__inscricao__estudante=request.user
    )


    evento = (
        certificado
        .presenca
        .inscricao
        .evento
    )


    # =====================================================
    # PLANO DO EVENTO
    # =====================================================

    if not evento.permite_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'O plano deste evento não '
                    'possui registro na Solana.'
                )
            },
            status=403
        )


    # =====================================================
    # JÁ REGISTRADO
    # =====================================================

    if certificado.registrado_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Este certificado já foi '
                    'registrado na Solana.'
                )
            },
            status=400
        )


    # =====================================================
    # CARTEIRA
    # =====================================================

    if not request.user.carteira_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Conecte uma carteira '
                    'Solana primeiro.'
                )
            },
            status=400
        )


    if (
        not
        request.user
        .carteira_solana_verificada
    ):

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Verifique sua carteira '
                    'Solana primeiro.'
                )
            },
            status=400
        )


    # =====================================================
    # HASH
    # =====================================================

    if not certificado.hash_certificado:

        certificado.save()


    memo = (
        f'ACADEVENTS:CERT:'
        f'{certificado.hash_certificado}'
    )


    return JsonResponse(
        {
            'ok': True,
            'certificado_id': certificado.id,
            'hash': certificado.hash_certificado,
            'memo': memo,
            'rede': certificado.rede_solana,
            'carteira': (
                request.user
                .carteira_solana
            ),
        }
    )


# =========================================================
# CONFIRMAR REGISTRO NA SOLANA
# =========================================================

@login_required
@somente_estudante
@require_POST
def confirmar_registro_solana(
    request,
    certificado_id
):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca__inscricao__estudante',
            'presenca__inscricao__evento'
        ),
        id=certificado_id,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada',
        presenca__inscricao__estudante=request.user
    )


    evento = (
        certificado
        .presenca
        .inscricao
        .evento
    )


    # =====================================================
    # PLANO
    # =====================================================

    if not evento.permite_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'O plano deste evento não '
                    'possui registro na Solana.'
                )
            },
            status=403
        )


    # =====================================================
    # JÁ REGISTRADO
    # =====================================================

    if certificado.registrado_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Este certificado já foi '
                    'registrado na Solana.'
                )
            },
            status=400
        )


    # =====================================================
    # CARTEIRA
    # =====================================================

    if not request.user.carteira_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Conecte uma carteira '
                    'Solana primeiro.'
                )
            },
            status=400
        )


    if (
        not
        request.user
        .carteira_solana_verificada
    ):

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Sua carteira Solana '
                    'ainda não foi verificada.'
                )
            },
            status=400
        )


    # =====================================================
    # RECEBER JSON
    # =====================================================

    try:

        dados = json.loads(
            request.body
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Dados inválidos.'
                )
            },
            status=400
        )


    assinatura = (
        dados.get(
            'assinatura'
        )
    )


    if not assinatura:

        return JsonResponse(
            {
                'ok': False,
                'erro': (
                    'Assinatura da transação '
                    'não informada.'
                )
            },
            status=400
        )


    # =====================================================
    # GARANTIR HASH
    # =====================================================

    if not certificado.hash_certificado:

        certificado.save()


    memo_esperado = (
        f'ACADEVENTS:CERT:'
        f'{certificado.hash_certificado}'
    )


    # =====================================================
    # CONSULTAR SOLANA
    # =====================================================

    resultado = (
        consultar_transacao_solana(
            assinatura=assinatura,
            memo_esperado=memo_esperado,
            carteira_esperada=(
                request.user
                .carteira_solana
            )
        )
    )


    if not resultado.get(
        'ok'
    ):

        return JsonResponse(
            {
                'ok': False,
                'erro': resultado.get(
                    'erro',
                    (
                        'Não foi possível validar '
                        'a transação na Solana.'
                    )
                )
            },
            status=400
        )


    # =====================================================
    # SALVAR
    # =====================================================

    certificado.assinatura_solana = (
        assinatura
    )

    certificado.registrado_solana = (
        True
    )

    certificado.data_registro_solana = (
        timezone.now()
    )

    certificado.save(
        update_fields=[
            'assinatura_solana',
            'registrado_solana',
            'data_registro_solana',
        ]
    )


    return JsonResponse(
        {
            'ok': True,
            'mensagem': (
                'Certificado registrado '
                'na Solana com sucesso.'
            ),
            'assinatura': (
                certificado
                .assinatura_solana
            ),
            'explorer_url': (
                certificado
                .solana_explorer_url
            ),
        }
    )