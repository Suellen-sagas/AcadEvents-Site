import hashlib
import uuid

from django.core.exceptions import ValidationError
from django.db import models

from presencas.models import Presenca


class Certificado(models.Model):

    presenca = models.OneToOneField(
        Presenca,
        on_delete=models.CASCADE,
        related_name='certificado'
    )

    codigo_validacao = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True
    )

    data_emissao = models.DateTimeField(
        auto_now_add=True
    )

    ativo = models.BooleanField(
        default=True
    )

    # =========================
    # SOLANA
    # =========================

    hash_certificado = models.CharField(
        max_length=64,
        blank=True,
        null=True
    )

    assinatura_solana = models.CharField(
        max_length=128,
        blank=True,
        null=True,
        unique=True
    )

    registrado_solana = models.BooleanField(
        default=False
    )

    data_registro_solana = models.DateTimeField(
        blank=True,
        null=True
    )

    rede_solana = models.CharField(
        max_length=20,
        default='devnet'
    )


    def clean(self):

        erros = {}

        if self.presenca_id:

            if not self.presenca.confirmada:

                erros['presenca'] = (
                    'O certificado só pode ser emitido '
                    'após a confirmação da presença.'
                )

            if (
                self.presenca.inscricao.status
                != 'confirmada'
            ):

                erros['presenca'] = (
                    'Não é possível manter um certificado '
                    'para uma inscrição cancelada.'
                )

        if erros:
            raise ValidationError(erros)


    def gerar_hash_certificado(self):

        inscricao = self.presenca.inscricao
        evento = inscricao.evento
        estudante = inscricao.estudante

        conteudo = (
            f'ACADEVENTS|'
            f'{self.codigo_validacao}|'
            f'{self.presenca.id}|'
            f'{evento.id}|'
            f'{estudante.id}'
        )

        return hashlib.sha256(
            conteudo.encode('utf-8')
        ).hexdigest()


    def save(self, *args, **kwargs):

        self.full_clean()

        if (
            self.presenca_id
            and not self.hash_certificado
        ):

            self.hash_certificado = (
                self.gerar_hash_certificado()
            )

        super().save(
            *args,
            **kwargs
        )


    @property
    def solana_explorer_url(self):

        if not self.assinatura_solana:
            return None

        return (
            'https://explorer.solana.com/tx/'
            f'{self.assinatura_solana}'
            f'?cluster={self.rede_solana}'
        )


    def __str__(self):

        return (
            f'Certificado '
            f'{self.codigo_validacao}'
        )