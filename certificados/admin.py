from django.contrib import admin
from .models import Certificado


@admin.register(Certificado)
class CertificadoAdmin(admin.ModelAdmin):

    list_display = (
        'presenca',
        'codigo_validacao',
        'data_emissao',
        'ativo',
    )

    list_filter = (
        'ativo',
        'data_emissao',
    )

    search_fields = (
        'presenca__inscricao__estudante__username',
        'presenca__inscricao__estudante__email',
        'presenca__inscricao__evento__titulo',
    )

    readonly_fields = (
        'codigo_validacao',
        'data_emissao',
    )