from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from eventos.models import Evento


class Inscricao(models.Model):

    STATUS_INSCRICAO = (
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
    )

    estudante = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inscricoes'
    )

    evento = models.ForeignKey(
        Evento,
        on_delete=models.CASCADE,
        related_name='inscricoes'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_INSCRICAO,
        default='confirmada'
    )

    data_inscricao = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['estudante', 'evento'],
                name='inscricao_unica_por_evento'
            )
        ]

    def clean(self):

        # Verifica se o evento está ativo
        if not self.evento.ativo:
            raise ValidationError(
                'Este evento não está disponível para inscrições.'
            )

        # Verifica o prazo de inscrição
        if timezone.now() > self.evento.data_limite_inscricao:
            raise ValidationError(
                'O prazo de inscrição deste evento já terminou.'
            )

        # Verifica o limite de vagas
        inscricoes_confirmadas = self.evento.inscricoes.filter(
            status='confirmada'
        )

        if self.pk:
            inscricoes_confirmadas = inscricoes_confirmadas.exclude(pk=self.pk)

        if (
            self.status == 'confirmada'
            and inscricoes_confirmadas.count() >= self.evento.limite_vagas
        ):
            raise ValidationError(
                'Não há mais vagas disponíveis para este evento.'
            )

    def __str__(self):
        return f'{self.estudante.username} - {self.evento.titulo}'