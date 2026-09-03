from django.db.models import Q
from django.shortcuts import render
from django.utils import timezone

from eventos.models import Evento


def home(request):
    agora = timezone.now()

    busca = request.GET.get(
        'busca',
        ''
    )

    modalidade = request.GET.get(
        'modalidade',
        ''
    )

    categoria = request.GET.get(
        'categoria',
        ''
    )

    eventos = Evento.objects.filter(
        ativo=True,
        data_fim__gte=agora
    )

    if busca:
        eventos = eventos.filter(
            Q(titulo__icontains=busca)
            | Q(descricao__icontains=busca)
            | Q(local__icontains=busca)
        )

    if modalidade:
        eventos = eventos.filter(
            modalidade=modalidade
        )

    if categoria:
        eventos = eventos.filter(
            categoria=categoria
        )

    acontecendo_agora = eventos.filter(
        data_inicio__lte=agora,
        data_fim__gte=agora
    ).order_by(
        'data_fim'
    )

    proximos_eventos = eventos.filter(
        data_inicio__gt=agora
    ).order_by(
        'data_inicio'
    )

    contexto = {
        'acontecendo_agora': acontecendo_agora,
        'proximos_eventos': proximos_eventos,
        'busca': busca,
        'modalidade': modalidade,
        'categoria': categoria,
    }

    return render(
        request,
        'core/home.html',
        contexto
    )