from django.contrib import admin
from .models import Evento


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = (
        'titulo',
        'organizador',
        'modalidade',
        'data_inicio',
        'limite_vagas',
        'ativo',
    )

    list_filter = (
        'modalidade',
        'ativo',
        'data_inicio',
    )

    search_fields = (
        'titulo',
        'descricao',
    )