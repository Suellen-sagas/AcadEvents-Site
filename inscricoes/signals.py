from django.db.models.signals import post_save
from django.dispatch import receiver

from presencas.models import Presenca

from .models import Inscricao


@receiver(post_save, sender=Inscricao)
def criar_presenca(sender, instance, **kwargs):

    if instance.status == 'confirmada':

        Presenca.objects.get_or_create(
            inscricao=instance
        )