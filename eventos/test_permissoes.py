from datetime import timedelta

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from usuarios.models import Usuario

from .models import Evento


class PermissoesEventosTest(TestCase):

    def setUp(self):

        self.estudante = Usuario.objects.create_user(
            username='estudante_seguranca',
            password='SenhaTeste123!',
            tipo_usuario='estudante'
        )

        self.organizador_a = Usuario.objects.create_user(
            username='organizador_a',
            password='SenhaTeste123!',
            tipo_usuario='organizador'
        )

        self.organizador_b = Usuario.objects.create_user(
            username='organizador_b',
            password='SenhaTeste123!',
            tipo_usuario='organizador'
        )

        self.admin = Usuario.objects.create_superuser(
            username='admin_teste',
            password='SenhaTeste123!'
        )

        agora = timezone.now()

        self.evento_a = Evento.objects.create(
            titulo='Evento do Organizador A',
            descricao='Evento para teste de segurança.',
            categoria='palestra',
            organizador=self.organizador_a,
            modalidade='presencial',
            local='Auditório A',
            data_inicio=agora + timedelta(days=10),
            data_fim=agora + timedelta(days=10, hours=2),
            data_limite_inscricao=agora + timedelta(days=9),
            limite_vagas=50,
            carga_horaria=2,
            ativo=True
        )


    def test_estudante_nao_acessa_painel_organizador(self):

        self.client.force_login(
            self.estudante
        )

        resposta = self.client.get(
            reverse(
                'eventos:painel_organizador'
            )
        )

        self.assertRedirects(
            resposta,
            reverse('home')
        )


    def test_organizador_acessa_proprio_evento(self):

        self.client.force_login(
            self.organizador_a
        )

        resposta = self.client.get(
            reverse(
                'eventos:gerenciar',
                args=[self.evento_a.id]
            )
        )

        self.assertEqual(
            resposta.status_code,
            200
        )


    def test_outro_organizador_nao_gerencia_evento(self):

        self.client.force_login(
            self.organizador_b
        )

        resposta = self.client.get(
            reverse(
                'eventos:gerenciar',
                args=[self.evento_a.id]
            )
        )

        self.assertRedirects(
            resposta,
            reverse(
                'eventos:painel_organizador'
            )
        )


    def test_outro_organizador_nao_edita_evento(self):

        self.client.force_login(
            self.organizador_b
        )

        resposta = self.client.get(
            reverse(
                'eventos:editar',
                args=[self.evento_a.id]
            )
        )

        self.assertRedirects(
            resposta,
            reverse(
                'eventos:painel_organizador'
            )
        )


    def test_outro_organizador_nao_acessa_relatorio(self):

        self.client.force_login(
            self.organizador_b
        )

        resposta = self.client.get(
            reverse(
                'eventos:relatorio',
                args=[self.evento_a.id]
            )
        )

        self.assertRedirects(
            resposta,
            reverse(
                'eventos:painel_organizador'
            )
        )


    def test_outro_organizador_nao_exporta_relatorio(self):

        self.client.force_login(
            self.organizador_b
        )

        resposta = self.client.get(
            reverse(
                'eventos:exportar_relatorio',
                args=[self.evento_a.id]
            )
        )

        self.assertRedirects(
            resposta,
            reverse(
                'eventos:painel_organizador'
            )
        )


    def test_outro_organizador_nao_altera_status(self):

        self.client.force_login(
            self.organizador_b
        )

        resposta = self.client.post(
            reverse(
                'eventos:alterar_status',
                args=[self.evento_a.id]
            )
        )

        self.evento_a.refresh_from_db()

        self.assertTrue(
            self.evento_a.ativo
        )

        self.assertRedirects(
            resposta,
            reverse(
                'eventos:painel_organizador'
            )
        )


    def test_admin_pode_gerenciar_evento(self):

        self.client.force_login(
            self.admin
        )

        resposta = self.client.get(
            reverse(
                'eventos:gerenciar',
                args=[self.evento_a.id]
            )
        )

        self.assertEqual(
            resposta.status_code,
            200
        )