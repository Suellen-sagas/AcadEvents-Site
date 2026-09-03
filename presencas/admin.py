from django.contrib import admin
from .models import Presenca


@admin.register(Presenca)
class PresencaAdmin(admin.ModelAdmin):

    list_display = (
        'inscricao',
        'codigo_qr',
        'confirmada',
        'data_confirmacao',
    )

    list_filter = (
        'confirmada',
    )

    search_fields = (
        'inscricao__estudante__username',
        'inscricao__estudante__email',
        'inscricao__evento__titulo',
    )

    readonly_fields = (
        'codigo_qr',
        'data_confirmacao',
    )