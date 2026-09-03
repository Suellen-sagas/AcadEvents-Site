from django import forms
from .models import Evento


class EventoForm(forms.ModelForm):

    class Meta:
        model = Evento

        fields = (
            'titulo',
            'descricao',
            'categoria',
            'modalidade',
            'local',
            'data_inicio',
            'data_fim',
            'data_limite_inscricao',
            'limite_vagas',
            'carga_horaria',
            'imagem',
        )

        widgets = {
            'data_inicio': forms.DateTimeInput(
                attrs={'type': 'datetime-local'}
            ),

            'data_fim': forms.DateTimeInput(
                attrs={'type': 'datetime-local'}
            ),

            'data_limite_inscricao': forms.DateTimeInput(
                attrs={'type': 'datetime-local'}
            ),
        }