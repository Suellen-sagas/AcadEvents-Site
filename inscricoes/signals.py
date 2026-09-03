from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Inscricao
from presencas.models import Presenca


@receiver(post_save, sender=Inscricao)
def criar_presenca(sender, instance, created, **kwargs):
    if created:
        Presenca.objects.get_or_create(inscricao=instance)