import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from inscricoes.models import Inscricao


class Presenca(models.Model):

    inscricao = models.OneToOneField(
        Inscricao,
        on_delete=models.CASCADE,
        related_name='presenca'
    )

    codigo_qr = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True
    )

    confirmada = models.BooleanField(
        default=False
    )

    data_confirmacao = models.DateTimeField(
        null=True,
        blank=True
    )


    def clean(self):

        if (
            self.confirmada
            and self.inscricao_id
            and self.inscricao.status != 'confirmada'
        ):
            raise ValidationError({
                'confirmada': (
                    'Não é possível confirmar presença '
                    'em uma inscrição cancelada.'
                )
            })


    def save(self, *args, **kwargs):

        self.full_clean()

        if self.confirmada and not self.data_confirmacao:

            self.data_confirmacao = timezone.now()

        elif not self.confirmada:

            self.data_confirmacao = None

        super().save(*args, **kwargs)


    def __str__(self):
        return f'Presença - {self.inscricao}'