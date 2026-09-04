from django.conf import settings
from django.db import models


class Plano(models.Model):

    TIPO_PLANO = (
        ('free', 'Free'),
        ('avulso', 'Evento avulso'),
        ('assinatura', 'Assinatura'),
        ('institucional', 'Institucional'),
    )

    nome = models.CharField(
        max_length=100
    )

    tipo = models.CharField(
        max_length=20,
        choices=TIPO_PLANO
    )

    descricao = models.TextField(
        blank=True
    )

    preco = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    limite_participantes = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text='Deixe vazio para ilimitado.'
    )

    limite_eventos_mes = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text='Usado principalmente em assinaturas.'
    )

    # =========================
    # RECURSOS
    # =========================

    permite_inscricoes = models.BooleanField(
        default=False
    )

    permite_eventos_pagos = models.BooleanField(
        default=False
    )

    permite_qr_code = models.BooleanField(
        default=False
    )

    permite_presenca = models.BooleanField(
        default=False
    )

    permite_certificados = models.BooleanField(
        default=False
    )

    permite_relatorios = models.BooleanField(
        default=False
    )

    permite_solana = models.BooleanField(
        default=False
    )

    permite_logo_certificado = models.BooleanField(
        default=False
    )

    prioridade_divulgacao = models.BooleanField(
        default=False
    )

    ativo = models.BooleanField(
        default=True
    )

    criado_em = models.DateTimeField(
        auto_now_add=True
    )

    atualizado_em = models.DateTimeField(
        auto_now=True
    )


    class Meta:
        ordering = [
            'preco'
        ]


    def __str__(self):

        return (
            f'{self.nome} - '
            f'R$ {self.preco}'
        )


class ContratacaoPlano(models.Model):

    STATUS = (
        ('pendente', 'Pendente'),
        ('pago', 'Pago'),
        ('ativo', 'Ativo'),
        ('cancelado', 'Cancelado'),
        ('expirado', 'Expirado'),
    )

    organizador = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='planos_contratados'
    )

    plano = models.ForeignKey(
        Plano,
        on_delete=models.PROTECT,
        related_name='contratacoes'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default='pendente'
    )

    valor = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    data_inicio = models.DateTimeField(
        null=True,
        blank=True
    )

    data_fim = models.DateTimeField(
        null=True,
        blank=True
    )

    criado_em = models.DateTimeField(
        auto_now_add=True
    )

    atualizado_em = models.DateTimeField(
        auto_now=True
    )


    def __str__(self):

        return (
            f'{self.organizador} - '
            f'{self.plano.nome}'
        )