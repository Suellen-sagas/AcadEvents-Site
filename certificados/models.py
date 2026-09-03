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


    def clean(self):

        erros = {}

        if self.presenca_id:

            if not self.presenca.confirmada:

                erros['presenca'] = (
                    'O certificado só pode ser emitido '
                    'após a confirmação da presença.'
                )

            if self.presenca.inscricao.status != 'confirmada':

                erros['presenca'] = (
                    'Não é possível manter um certificado '
                    'para uma inscrição cancelada.'
                )

        if erros:
            raise ValidationError(erros)


    def save(self, *args, **kwargs):

        self.full_clean()

        super().save(*args, **kwargs)


    def __str__(self):

        return (
            f'Certificado - '
            f'{self.presenca.inscricao}'
        )