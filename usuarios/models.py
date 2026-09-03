from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):

    TIPO_USUARIO = (
        ('estudante', 'Estudante'),
        ('organizador', 'Organizador'),
        ('administrador', 'Administrador'),
    )

    tipo_usuario = models.CharField(
        max_length=20,
        choices=TIPO_USUARIO,
        default='estudante'
    )

    instituicao = models.CharField(
        max_length=200,
        blank=True
    )

    curso = models.CharField(
        max_length=200,
        blank=True
    )

    matricula = models.CharField(
        max_length=50,
        blank=True
    )

    carteira_solana = models.CharField(
        max_length=44,
        blank=True,
        null=True,
        unique=True,
        verbose_name='Carteira Solana'
    )

    carteira_solana_verificada = models.BooleanField(
        default=False,
        verbose_name='Carteira Solana verificada'
    )

    def __str__(self):
        return self.get_full_name() or self.username