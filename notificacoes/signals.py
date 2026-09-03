from django.db.models.signals import post_save
from django.dispatch import receiver

from certificados.models import Certificado
from inscricoes.models import Inscricao

from .models import Notificacao


@receiver(post_save, sender=Inscricao)
def notificacao_inscricao(sender, instance, created, **kwargs):

    if instance.status != 'confirmada':
        return

    Notificacao.objects.get_or_create(
        usuario=instance.estudante,
        evento=instance.evento,
        tipo='inscricao',
        defaults={
            'titulo': 'Inscrição confirmada',
            'mensagem': (
                f'Sua inscrição no evento '
                f'"{instance.evento.titulo}" foi confirmada.'
            )
        }
    )


@receiver(post_save, sender=Certificado)
def notificacao_certificado(sender, instance, created, **kwargs):

    if not created:
        return

    inscricao = instance.presenca.inscricao
    evento = inscricao.evento
    estudante = inscricao.estudante

    Notificacao.objects.get_or_create(
        usuario=estudante,
        evento=evento,
        tipo='certificado',
        defaults={
            'titulo': 'Certificado disponível',
            'mensagem': (
                f'O certificado do evento '
                f'"{evento.titulo}" já está disponível.'
            )
        }
    )