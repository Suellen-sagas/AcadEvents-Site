from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_GET

from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas

from usuarios.decorators import somente_estudante

from .models import Certificado


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
        .order_by('-data_emissao')
    )

    return render(
        request,
        'certificados/meus_certificados.html',
        {
            'certificados': certificados
        }
    )


@login_required
@somente_estudante
def baixar_certificado(request, certificado_id):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca',
            'presenca__inscricao',
            'presenca__inscricao__estudante',
            'presenca__inscricao__evento'
        ),
        id=certificado_id,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada',
        presenca__inscricao__estudante=request.user
    )

    inscricao = certificado.presenca.inscricao
    evento = inscricao.evento
    estudante = inscricao.estudante

    nome_estudante = (
        estudante.get_full_name()
        or estudante.username
    )

    response = HttpResponse(
        content_type='application/pdf'
    )

    response['Content-Disposition'] = (
        f'attachment; filename="certificado_{certificado.id}.pdf"'
    )

    pagina = landscape(A4)
    largura, altura = pagina

    pdf = canvas.Canvas(
        response,
        pagesize=pagina
    )

    # Fundo
    pdf.setFillColorRGB(
        0.04,
        0.04,
        0.06
    )

    pdf.rect(
        0,
        0,
        largura,
        altura,
        fill=1,
        stroke=0
    )

    # Borda
    pdf.setStrokeColorRGB(
        0.49,
        0.23,
        0.93
    )

    pdf.setLineWidth(4)

    pdf.rect(
        30,
        30,
        largura - 60,
        altura - 60,
        fill=0,
        stroke=1
    )

    # Marca
    pdf.setFillColorRGB(
        0.65,
        0.55,
        0.98
    )

    pdf.setFont(
        'Helvetica-Bold',
        18
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 95,
        'ACADEVENTS'
    )

    # Título
    pdf.setFillColorRGB(
        1,
        1,
        1
    )

    pdf.setFont(
        'Helvetica-Bold',
        34
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 155,
        'CERTIFICADO'
    )

    # Texto
    pdf.setFillColorRGB(
        0.80,
        0.80,
        0.84
    )

    pdf.setFont(
        'Helvetica',
        15
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 210,
        'Certificamos que'
    )

    # Nome
    pdf.setFillColorRGB(
        0.72,
        0.60,
        1
    )

    pdf.setFont(
        'Helvetica-Bold',
        25
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 255,
        nome_estudante
    )

    # Evento
    pdf.setFillColorRGB(
        0.80,
        0.80,
        0.84
    )

    pdf.setFont(
        'Helvetica',
        14
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 305,
        'participou do evento'
    )

    pdf.setFillColorRGB(
        1,
        1,
        1
    )

    pdf.setFont(
        'Helvetica-Bold',
        19
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 340,
        evento.titulo
    )

    # Data e carga horária
    pdf.setFillColorRGB(
        0.75,
        0.75,
        0.80
    )

    pdf.setFont(
        'Helvetica',
        12
    )

    texto_evento = (
        f'Realizado em '
        f'{evento.data_inicio.strftime("%d/%m/%Y")} '
        f'com carga horária de '
        f'{evento.carga_horaria} hora(s).'
    )

    pdf.drawCentredString(
        largura / 2,
        altura - 385,
        texto_evento
    )

    # Código
    pdf.setFont(
        'Helvetica',
        9
    )

    pdf.setFillColorRGB(
        0.55,
        0.55,
        0.60
    )

    pdf.drawCentredString(
        largura / 2,
        90,
        f'Código de validação: {certificado.codigo_validacao}'
    )

    url_validacao = request.build_absolute_uri(
        reverse(
            'certificados:validar',
            args=[
                certificado.codigo_validacao
            ]
        )
    )

    pdf.drawCentredString(
        largura / 2,
        70,
        url_validacao
    )

    pdf.save()

    return response


def validar_certificado(request, codigo_validacao):

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

@login_required
@somente_estudante
@require_GET
def dados_registro_solana(request, certificado_id):

    certificado = get_object_or_404(
        Certificado.objects.select_related(
            'presenca__inscricao__estudante'
        ),
        id=certificado_id,
        ativo=True,
        presenca__confirmada=True,
        presenca__inscricao__status='confirmada',
        presenca__inscricao__estudante=request.user
    )

    if certificado.registrado_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Este certificado já foi registrado na Solana.'
            },
            status=400
        )

    if not request.user.carteira_solana:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Conecte uma carteira Solana primeiro.'
            },
            status=400
        )

    if not request.user.carteira_solana_verificada:

        return JsonResponse(
            {
                'ok': False,
                'erro': 'Verifique sua carteira Solana primeiro.'
            },
            status=400
        )

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
            'carteira': request.user.carteira_solana,
        }
    )