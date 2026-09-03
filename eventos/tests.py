from datetime import timedelta

from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from usuarios.models import Usuario

from .models import Evento


class EventoModelTest(TestCase):

    def setUp(self):

        self.organizador = Usuario.objects.create_user(
            username='organizador_teste',
            password='SenhaTeste123!',
            tipo_usuario='organizador'
        )

        agora = timezone.now()

        self.dados_evento = {
            'titulo': 'Evento de Teste',
            'descricao': 'Descrição do evento.',
            'categoria': 'palestra',
            'organizador': self.organizador,
            'modalidade': 'presencial',
            'local': 'Auditório AcadEvents',
            'data_inicio': agora + timedelta(days=10),
            'data_fim': agora + timedelta(days=10, hours=2),
            'data_limite_inscricao': agora + timedelta(days=9),
            'limite_vagas': 50,
            'carga_horaria': 2,
            'ativo': True,
        }


    def criar_evento(self, **alteracoes):

        dados = self.dados_evento.copy()
        dados.update(alteracoes)

        return Evento(**dados)


    def test_evento_valido(self):

        evento = self.criar_evento()

        evento.full_clean()
        evento.save()

        self.assertEqual(
            Evento.objects.count(),
            1
        )


    def test_data_fim_nao_pode_ser_antes_do_inicio(self):

        evento = self.criar_evento(
            data_fim=(
                self.dados_evento['data_inicio']
                - timedelta(hours=1)
            )
        )

        with self.assertRaises(ValidationError):
            evento.full_clean()


    def test_inscricao_nao_pode_terminar_depois_do_inicio(self):

        evento = self.criar_evento(
            data_limite_inscricao=(
                self.dados_evento['data_inicio']
                + timedelta(hours=1)
            )
        )

        with self.assertRaises(ValidationError):
            evento.full_clean()


    def test_evento_presencial_precisa_de_local(self):

        evento = self.criar_evento(
            local=''
        )

        with self.assertRaises(ValidationError):
            evento.full_clean()


    def test_evento_online_pode_ficar_sem_local(self):

        evento = self.criar_evento(
            modalidade='online',
            local=''
        )

        evento.full_clean()


    def test_limite_de_vagas_deve_ser_maior_que_zero(self):

        evento = self.criar_evento(
            limite_vagas=0
        )

        with self.assertRaises(ValidationError):
            evento.full_clean()


    def test_carga_horaria_deve_ser_maior_que_zero(self):

        evento = self.criar_evento(
            carga_horaria=0
        )

        with self.assertRaises(ValidationError):
            evento.full_clean()