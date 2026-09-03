from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Evento(models.Model):

    MODALIDADES = (
        ('presencial', 'Presencial'),
        ('online', 'Online'),
        ('hibrido', 'Híbrido'),
    )

    CATEGORIAS = (
        ('palestra', 'Palestra'),
        ('workshop', 'Workshop'),
        ('curso', 'Curso'),
        ('seminario', 'Seminário'),
        ('congresso', 'Congresso'),
        ('feira', 'Feira Acadêmica'),
        ('outro', 'Outro'),
    )

    titulo = models.CharField(
        max_length=200
    )

    descricao = models.TextField()

    categoria = models.CharField(
        max_length=20,
        choices=CATEGORIAS,
        default='palestra'
    )

    organizador = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='eventos_criados'
    )

    modalidade = models.CharField(
        max_length=20,
        choices=MODALIDADES
    )

    local = models.CharField(
        max_length=255,
        blank=True
    )

    data_inicio = models.DateTimeField()

    data_fim = models.DateTimeField()

    data_limite_inscricao = models.DateTimeField()

    limite_vagas = models.PositiveIntegerField()

    carga_horaria = models.PositiveIntegerField(
        help_text='Carga horária do evento em horas'
    )

    imagem = models.ImageField(
        upload_to='eventos/',
        blank=True,
        null=True
    )

    criado_em = models.DateTimeField(
        auto_now_add=True
    )

    atualizado_em = models.DateTimeField(
        auto_now=True
    )

    ativo = models.BooleanField(
        default=True
    )


    def clean(self):

        erros = {}


        # Data de término precisa ser depois do início.
        if (
            self.data_inicio
            and self.data_fim
            and self.data_fim <= self.data_inicio
        ):
            erros['data_fim'] = (
                'A data de término deve ser posterior '
                'à data de início.'
            )


        # Inscrições precisam terminar antes do evento começar.
        if (
            self.data_inicio
            and self.data_limite_inscricao
            and self.data_limite_inscricao > self.data_inicio
        ):
            erros['data_limite_inscricao'] = (
                'O prazo de inscrição não pode terminar '
                'depois do início do evento.'
            )


        # Evento precisa ter ao menos uma vaga.
        if (
            self.limite_vagas is not None
            and self.limite_vagas <= 0
        ):
            erros['limite_vagas'] = (
                'O evento precisa ter pelo menos 1 vaga.'
            )


        # Não permite reduzir as vagas abaixo
        # da quantidade de pessoas já inscritas.
        if (
            self.pk
            and self.limite_vagas is not None
        ):

            total_inscritos = self.inscricoes.filter(
                status='confirmada'
            ).count()

            if self.limite_vagas < total_inscritos:

                erros['limite_vagas'] = (
                    f'Este evento já possui '
                    f'{total_inscritos} participante(s) inscrito(s). '
                    f'O limite de vagas não pode ser menor que '
                    f'{total_inscritos}.'
                )


        # Carga horária precisa ser maior que zero.
        if (
            self.carga_horaria is not None
            and self.carga_horaria <= 0
        ):
            erros['carga_horaria'] = (
                'A carga horária precisa ser maior que zero.'
            )


        # Evento presencial precisa informar local.
        if (
            self.modalidade == 'presencial'
            and not self.local
        ):
            erros['local'] = (
                'Informe o local do evento presencial.'
            )


        if erros:
            raise ValidationError(erros)


    def __str__(self):
        return self.titulo


    @property
    def total_inscritos(self):

        return self.inscricoes.filter(
            status='confirmada'
        ).count()


    @property
    def total_lista_espera(self):

        return self.inscricoes.filter(
            status='espera'
        ).count()


class Favorito(models.Model):

    estudante = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favoritos'
    )

    evento = models.ForeignKey(
        Evento,
        on_delete=models.CASCADE,
        related_name='favoritos'
    )

    criado_em = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'estudante',
                    'evento'
                ],
                name='favorito_unico_por_evento'
            )
        ]


    def __str__(self):
        return (
            f'{self.estudante.username} - '
            f'{self.evento.titulo}'
        )