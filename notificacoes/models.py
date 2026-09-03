from django.conf import settings
from django.db import models

from eventos.models import Evento


class Notificacao(models.Model):

    TIPOS = (
        ('inscricao', 'Inscrição'),
        ('certificado', 'Certificado'),
        ('evento', 'Evento'),
        ('sistema', 'Sistema'),
    )

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notificacoes'
    )

    evento = models.ForeignKey(
        Evento,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notificacoes'
    )

    tipo = models.CharField(
        max_length=20,
        choices=TIPOS
    )

    titulo = models.CharField(
        max_length=150
    )

    mensagem = models.TextField()

    lida = models.BooleanField(
        default=False
    )

    criada_em = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:
        ordering = ['-criada_em']


    def __str__(self):
        return f'{self.usuario.username} - {self.titulo}'