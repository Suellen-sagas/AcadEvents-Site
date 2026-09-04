from django.shortcuts import render

from .models import Plano


def escolher_plano(request):

    planos_avulsos = (
        Plano.objects
        .filter(
            ativo=True,
            tipo__in=[
                'free',
                'avulso'
            ]
        )
        .order_by('preco')
    )

    assinaturas = (
        Plano.objects
        .filter(
            ativo=True,
            tipo='assinatura'
        )
        .order_by('preco')
    )

    plano_institucional = (
        Plano.objects
        .filter(
            ativo=True,
            tipo='institucional'
        )
        .first()
    )

    return render(
        request,
        'planos/escolher_plano.html',
        {
            'planos_avulsos': planos_avulsos,
            'assinaturas': assinaturas,
            'plano_institucional': plano_institucional,
        }
    )