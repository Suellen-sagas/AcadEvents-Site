from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):

    list_display = (
        'username',
        'first_name',
        'last_name',
        'email',
        'tipo_usuario',
        'instituicao',
        'curso',
        'is_active',
    )

    list_filter = (
        'tipo_usuario',
        'instituicao',
        'is_active',
        'is_staff',
    )

    search_fields = (
        'username',
        'first_name',
        'last_name',
        'email',
        'matricula',
    )

    fieldsets = UserAdmin.fieldsets + (
        ('AcadEvents', {
            'fields': (
                'tipo_usuario',
                'instituicao',
                'curso',
                'matricula',
            )
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('AcadEvents', {
            'fields': (
                'email',
                'first_name',
                'last_name',
                'tipo_usuario',
                'instituicao',
                'curso',
                'matricula',
            )
        }),
    )
    