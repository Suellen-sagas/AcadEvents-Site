from datetime import timedelta

from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from eventos.models import Evento
from usuarios.models import Usuario

from .models import Inscricao


class InscricaoModelTest(TestCase):

    def setUp(self):

        self.organizador = Usuario.objects.create_user(
            username='organizador_teste',
            password='SenhaTeste123!',
            tipo_usuario='organizador'
        )

        self.estudante = Usuario.objects.create_user(
            username='estudante_teste',
            password='SenhaTeste123!',
            tipo_usuario='estudante'
        )

        self.outro_estudante = Usuario.objects.create_user(
            username='estudante_teste_2',
            password='SenhaTeste123!',
            tipo_usuario='estudante'
        )

        agora = timezone.now()

        self.evento = Evento.objects.create(
            titulo='Evento de Teste',
            descricao='Evento para testar inscrições.',
            categoria='palestra',
            organizador=self.organizador,
            modalidade='presencial',
            local='Auditório AcadEvents',
            data_inicio=agora + timedelta(days=10),
            data_fim=agora + timedelta(days=10, hours=2),
            data_limite_inscricao=agora + timedelta(days=9),
            limite_vagas=2,
            carga_horaria=2,
            ativo=True
        )


    def test_estudante_pode_se_inscrever(self):

        inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento
        )

        inscricao.full_clean()
        inscricao.save()

        self.assertEqual(
            Inscricao.objects.count(),
            1
        )

        self.assertEqual(
            inscricao.status,
            'confirmada'
        )


    def test_estudante_nao_pode_ter_inscricao_duplicada(self):

        Inscricao.objects.create(
            estudante=self.estudante,
            evento=self.evento
        )

        segunda_inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento
        )

        with self.assertRaises(ValidationError):
            segunda_inscricao.full_clean()


    def test_evento_cheio_nao_aceita_nova_inscricao(self):

        self.evento.limite_vagas = 1
        self.evento.save()

        primeira = Inscricao(
            estudante=self.estudante,
            evento=self.evento
        )

        primeira.full_clean()
        primeira.save()

        segunda = Inscricao(
            estudante=self.outro_estudante,
            evento=self.evento
        )

        with self.assertRaises(ValidationError):
            segunda.full_clean()


    def test_inscricao_cancelada_nao_ocupa_vaga(self):

        self.evento.limite_vagas = 1
        self.evento.save()

        inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento,
            status='cancelada'
        )

        inscricao.full_clean()
        inscricao.save()

        nova_inscricao = Inscricao(
            estudante=self.outro_estudante,
            evento=self.evento
        )

        nova_inscricao.full_clean()
        nova_inscricao.save()

        self.assertEqual(
            Inscricao.objects.filter(
                evento=self.evento,
                status='confirmada'
            ).count(),
            1
        )


    def test_nao_pode_inscrever_em_evento_inativo(self):

        self.evento.ativo = False
        self.evento.save()

        inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento
        )

        with self.assertRaises(ValidationError):
            inscricao.full_clean()


    def test_nao_pode_inscrever_apos_prazo(self):

        self.evento.data_limite_inscricao = (
            timezone.now()
            - timedelta(hours=1)
        )

        self.evento.save()

        inscricao = Inscricao(
            estudante=self.estudante,
            evento=self.evento
        )

        with self.assertRaises(ValidationError):
            inscricao.full_clean()