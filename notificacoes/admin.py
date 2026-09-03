from django.contrib import admin

from .models import Notificacao


@admin.register(Notificacao)
class NotificacaoAdmin(admin.ModelAdmin):

    list_display = (
        'titulo',
        'usuario',
        'tipo',
        'evento',
        'lida',
        'criada_em',
    )

    list_filter = (
        'tipo',
        'lida',
        'criada_em',
    )

    search_fields = (
        'titulo',
        'mensagem',
        'usuario__username',
        'usuario__email',
        'evento__titulo',
    )

    readonly_fields = (
        'criada_em',
    )