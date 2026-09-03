from functools import wraps

from django.contrib import messages
from django.shortcuts import redirect


def somente_estudante(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        if request.user.tipo_usuario != 'estudante':

            messages.error(
                request,
                'Esta área é exclusiva para estudantes.'
            )

            return redirect('home')

        return view_func(
            request,
            *args,
            **kwargs
        )

    return wrapper


def somente_organizador(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        if (
            request.user.tipo_usuario not in (
                'organizador',
                'administrador'
            )
            and not request.user.is_superuser
        ):

            messages.error(
                request,
                'Esta área é exclusiva para organizadores.'
            )

            return redirect('home')

        return view_func(
            request,
            *args,
            **kwargs
        )

    return wrapper