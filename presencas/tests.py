from datetime import timedelta

from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from certificados.models import Certificado
from eventos.models import Evento
from inscricoes.models import Inscricao
from notificacoes.models import Notificacao
from usuarios.models import Usuario

from .models import Presenca


class PresencaIntegracaoTest(TestCase):

    def setUp(self):

        self.organizador = Usuario.objects.create_user(
            username='organizador_presenca',
            password='SenhaTeste123!',
            tipo_usuario='organizador'
        )

        self.estudante = Usuario.objects.create_user(
            username='estudante_presenca',
            password='SenhaTeste123!',
            tipo_usuario='estudante'
        )

        agora = timezone.now()

        self.evento = Evento.objects.create(
            titulo='Evento Presença',
            descricao='Evento para teste de presença.',
            categoria='palestra',
            organizador=self.organizador,
            modalidade='presencial',
            local='Auditório AcadEvents',
            data_inicio=agora + timedelta(days=5),
            data_fim=agora + timedelta(days=5, hours=2),
            data_limite_inscricao=agora + timedelta(days=4),
            limite_vagas=50,
            carga_horaria=2,
            ativo=True
        )


    def criar_inscricao(self):

        inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento,
            status='confirmada'
        )

        inscricao.full_clean()
        inscricao.save()

        return inscricao


    def test_presenca_e_criada_automaticamente(self):

        inscricao = self.criar_inscricao()

        self.assertTrue(
            Presenca.objects.filter(
                inscricao=inscricao
            ).exists()
        )


    def test_presenca_comeca_nao_confirmada(self):

        inscricao = self.criar_inscricao()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        self.assertFalse(
            presenca.confirmada
        )

        self.assertIsNone(
            presenca.data_confirmacao
        )


    def test_confirmar_presenca_registra_data(self):

        inscricao = self.criar_inscricao()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        presenca.confirmada = True
        presenca.save()

        presenca.refresh_from_db()

        self.assertTrue(
            presenca.confirmada
        )

        self.assertIsNotNone(
            presenca.data_confirmacao
        )


    def test_confirmar_presenca_cria_certificado(self):

        inscricao = self.criar_inscricao()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        self.assertFalse(
            Certificado.objects.filter(
                presenca=presenca
            ).exists()
        )

        presenca.confirmada = True
        presenca.save()

        self.assertTrue(
            Certificado.objects.filter(
                presenca=presenca,
                ativo=True
            ).exists()
        )


    def test_certificado_nao_duplica(self):

        inscricao = self.criar_inscricao()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        presenca.confirmada = True
        presenca.save()

        presenca.save()

        self.assertEqual(
            Certificado.objects.filter(
                presenca=presenca
            ).count(),
            1
        )


    def test_certificado_gera_notificacao(self):

        inscricao = self.criar_inscricao()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        presenca.confirmada = True
        presenca.save()

        self.assertTrue(
            Notificacao.objects.filter(
                usuario=self.estudante,
                evento=self.evento,
                tipo='certificado'
            ).exists()
        )


    def test_inscricao_confirmada_gera_notificacao(self):

        self.criar_inscricao()

        self.assertTrue(
            Notificacao.objects.filter(
                usuario=self.estudante,
                evento=self.evento,
                tipo='inscricao'
            ).exists()
        )


    def test_nao_pode_confirmar_presenca_cancelada(self):

        inscricao = self.criar_inscricao()

        inscricao.status = 'cancelada'
        inscricao.save()

        presenca = Presenca.objects.get(
            inscricao=inscricao
        )

        presenca.confirmada = True

        with self.assertRaises(ValidationError):
            presenca.save()