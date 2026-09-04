from django import forms

from planos.models import Plano

from .models import Evento


class EventoForm(forms.ModelForm):

    class Meta:

        model = Evento

        fields = [
            'plano',
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
            'logo_certificado',
        ]

        widgets = {

            'titulo': forms.TextInput(
                attrs={
                    'placeholder': 'Nome do evento'
                }
            ),

            'descricao': forms.Textarea(
                attrs={
                    'placeholder': (
                        'Conte sobre o evento...'
                    ),
                    'rows': 5,
                }
            ),

            'local': forms.TextInput(
                attrs={
                    'placeholder': (
                        'Local ou endereço do evento'
                    )
                }
            ),

            'data_inicio': forms.DateTimeInput(
                attrs={
                    'type': 'datetime-local'
                },
                format='%Y-%m-%dT%H:%M'
            ),

            'data_fim': forms.DateTimeInput(
                attrs={
                    'type': 'datetime-local'
                },
                format='%Y-%m-%dT%H:%M'
            ),

            'data_limite_inscricao': forms.DateTimeInput(
                attrs={
                    'type': 'datetime-local'
                },
                format='%Y-%m-%dT%H:%M'
            ),

            'limite_vagas': forms.NumberInput(
                attrs={
                    'min': 1
                }
            ),

            'carga_horaria': forms.NumberInput(
                attrs={
                    'min': 1
                }
            ),
        }

    def __init__(
        self,
        *args,
        organizador=None,
        plano_selecionado=None,
        **kwargs
    ):

        super().__init__(
            *args,
            **kwargs
        )

        # =============================================
        # ORGANIZADOR
        # =============================================

        if organizador:

            self.instance.organizador = (
                organizador
            )

        # =============================================
        # PLANO
        # =============================================

        self.fields[
            'plano'
        ].required = True

        if plano_selecionado:

            self.instance.plano = (
                plano_selecionado
            )

            self.fields[
                'plano'
            ].queryset = (
                Plano.objects
                .filter(
                    id=plano_selecionado.id,
                    ativo=True
                )
            )

            self.fields[
                'plano'
            ].initial = (
                plano_selecionado.id
            )

            self.fields[
                'plano'
            ].widget = (
                forms.HiddenInput()
            )

        else:

            self.fields[
                'plano'
            ].queryset = (
                Plano.objects
                .filter(
                    ativo=True
                )
                .order_by(
                    'preco'
                )
            )

        # =============================================
        # DATAS
        # =============================================

        self.fields[
            'data_inicio'
        ].input_formats = [
            '%Y-%m-%dT%H:%M'
        ]

        self.fields[
            'data_fim'
        ].input_formats = [
            '%Y-%m-%dT%H:%M'
        ]

        self.fields[
            'data_limite_inscricao'
        ].input_formats = [
            '%Y-%m-%dT%H:%M'
        ]