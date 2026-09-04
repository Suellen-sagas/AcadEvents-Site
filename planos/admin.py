from django.contrib import admin

from .models import (
    Plano,
    ContratacaoPlano,
)


@admin.register(Plano)
class PlanoAdmin(admin.ModelAdmin):

    list_display = (
        'nome',
        'tipo',
        'preco',
        'limite_participantes',
        'limite_eventos_mes',
        'ativo',
    )

    list_filter = (
        'tipo',
        'ativo',
    )

    search_fields = (
        'nome',
    )


@admin.register(ContratacaoPlano)
class ContratacaoPlanoAdmin(admin.ModelAdmin):

    list_display = (
        'organizador',
        'plano',
        'status',
        'valor',
        'data_inicio',
        'data_fim',
    )

    list_filter = (
        'status',
        'plano',
    )

    search_fields = (
        'organizador__username',
        'organizador__email',
    )