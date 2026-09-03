from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Presenca
from certificados.models import Certificado


@receiver(post_save, sender=Presenca)
def criar_certificado(sender, instance, **kwargs):

    if instance.confirmada:
        Certificado.objects.get_or_create(
            presenca=instance
        )
        