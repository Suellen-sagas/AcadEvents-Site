from django.contrib import admin
from .models import Inscricao


@admin.register(Inscricao)
class InscricaoAdmin(admin.ModelAdmin):

    list_display = (
        'estudante',
        'evento',
        'status',
        'data_inscricao',
    )

    list_filter = (
        'status',
        'evento',
    )

    search_fields = (
        'estudante__username',
        'estudante__email',
        'evento__titulo',
    )