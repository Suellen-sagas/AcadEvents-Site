from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Sum
from django.utils import timezone


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
        ('feira', 'Feira'),
        ('outro', 'Outro'),
    )

    plano = models.ForeignKey(
        'planos.Plano',
        on_delete=models.PROTECT,
        related_name='eventos',
        null=True,
        blank=True,
        verbose_name='Plano do evento'
    )

    titulo = models.CharField(
        max_length=200
    )

    descricao = models.TextField()

    categoria = models.CharField(
        max_length=30,
        choices=CATEGORIAS
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

    carga_horaria = models.PositiveIntegerField()

    imagem = models.ImageField(
        upload_to='eventos/',
        blank=True,
        null=True
    )

    logo_certificado = models.ImageField(
        upload_to='logos_certificados/',
        blank=True,
        null=True,
        verbose_name='Logo para o certificado',
        help_text=(
            'Logo da empresa, instituição ou organizador '
            'que será exibida no certificado.'
     )
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

    # =====================================================
    # VALIDAÇÕES
    # =====================================================

    def clean(self):

        erros = {}

        # DATA FINAL

        if (
            self.data_inicio
            and self.data_fim
            and self.data_fim <= self.data_inicio
        ):

            erros['data_fim'] = (
                'A data de término deve ser posterior '
                'à data de início.'
            )

        # PRAZO DE INSCRIÇÃO

        if (
            self.data_limite_inscricao
            and self.data_inicio
            and self.data_limite_inscricao > self.data_inicio
        ):

            erros['data_limite_inscricao'] = (
                'O prazo de inscrição não pode ser '
                'posterior ao início do evento.'
            )

        # VAGAS

        if (
            self.limite_vagas is not None
            and self.limite_vagas <= 0
        ):

            erros['limite_vagas'] = (
                'O limite de vagas deve ser maior que zero.'
            )

        # CARGA HORÁRIA

        if (
            self.carga_horaria is not None
            and self.carga_horaria <= 0
        ):

            erros['carga_horaria'] = (
                'A carga horária deve ser maior que zero.'
            )

        # LOCAL

        if (
            self.modalidade == 'presencial'
            and not self.local
        ):

            erros['local'] = (
                'Informe o local para eventos presenciais.'
            )

        # =================================================
        # NÃO PERMITE REDUZIR VAGAS ABAIXO DOS INSCRITOS
        # =================================================

        if self.pk and self.limite_vagas:

            inscritos_confirmados = (
                self.inscricoes
                .filter(
                    status='confirmada'
                )
                .count()
            )

            if (
                self.limite_vagas
                < inscritos_confirmados
            ):

                erros['limite_vagas'] = (
                    'O limite de vagas não pode ser menor '
                    'que a quantidade de inscritos confirmados.'
                )

        # =================================================
        # LIMITES DO PLANO
        # =================================================

        if (
            self.plano_id
            and self.limite_vagas
        ):

            plano = self.plano

            # ---------------------------------------------
            # EVENTO AVULSO
            # ---------------------------------------------

            if (
                plano.tipo == 'avulso'
                and plano.limite_participantes
                and self.limite_vagas
                > plano.limite_participantes
            ):

                erros['limite_vagas'] = (
                    f'O plano {plano.nome} permite no máximo '
                    f'{plano.limite_participantes} participantes '
                    'por evento.'
                )

            # ---------------------------------------------
            # ASSINATURA
            # ---------------------------------------------

            if (
                plano.tipo == 'assinatura'
                and self.organizador_id
                and self.data_inicio
            ):

                eventos_mes = (
                    Evento.objects
                    .filter(
                        organizador_id=self.organizador_id,
                        plano_id=plano.id,
                        data_inicio__year=self.data_inicio.year,
                        data_inicio__month=self.data_inicio.month,
                    )
                )

                if self.pk:

                    eventos_mes = (
                        eventos_mes
                        .exclude(
                            pk=self.pk
                        )
                    )

                # LIMITE DE EVENTOS NO MÊS

                if (
                    plano.limite_eventos_mes
                    and eventos_mes.count()
                    >= plano.limite_eventos_mes
                ):

                    erros['plano'] = (
                        f'O plano {plano.nome} permite até '
                        f'{plano.limite_eventos_mes} eventos '
                        'por mês.'
                    )

                # LIMITE TOTAL DE PARTICIPANTES DO MÊS

                total_vagas_mes = (
                    eventos_mes
                    .aggregate(
                        total=Sum(
                            'limite_vagas'
                        )
                    )
                    .get('total')
                    or 0
                )

                novo_total = (
                    total_vagas_mes
                    + self.limite_vagas
                )

                if (
                    plano.limite_participantes
                    and novo_total
                    > plano.limite_participantes
                ):

                    restantes = max(
                        plano.limite_participantes
                        - total_vagas_mes,
                        0
                    )

                    erros['limite_vagas'] = (
                        f'O plano {plano.nome} permite '
                        f'{plano.limite_participantes} '
                        'participantes no total por mês. '
                        f'Você ainda possui {restantes} vagas '
                        'disponíveis neste mês.'
                    )

        if erros:
            raise ValidationError(erros)

    # =====================================================
    # CONTADORES
    # =====================================================

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

    # =====================================================
    # RECURSOS DO PLANO
    # =====================================================

    @property
    def permite_inscricoes(self):

        if not self.plano:
            return True

        return self.plano.permite_inscricoes

    @property
    def permite_eventos_pagos(self):

        if not self.plano:
            return True

        return self.plano.permite_eventos_pagos

    @property
    def permite_qr_code(self):

        if not self.plano:
            return True

        return self.plano.permite_qr_code

    @property
    def permite_presenca(self):

        if not self.plano:
            return True

        return self.plano.permite_presenca

    @property
    def permite_certificados(self):

        if not self.plano:
            return True

        return self.plano.permite_certificados

    @property
    def permite_relatorios(self):

        if not self.plano:
            return True

        return self.plano.permite_relatorios

    @property
    def permite_solana(self):

        if not self.plano:
            return True

        return self.plano.permite_solana

    @property
    def permite_logo_certificado(self):

        if not self.plano:
            return True

        return self.plano.permite_logo_certificado

    # =====================================================
    # STATUS
    # =====================================================

    @property
    def acontecendo_agora(self):

        agora = timezone.now()

        return (
            self.data_inicio
            <= agora
            <= self.data_fim
        )

    def __str__(self):
        return self.titulo


class Favorito(models.Model):

    usuario = models.ForeignKey(
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
                    'usuario',
                    'evento'
                ],
                name='favorito_unico_por_evento'
            )
        ]

    def __str__(self):

        return (
            f'{self.usuario} - '
            f'{self.evento}'
        )