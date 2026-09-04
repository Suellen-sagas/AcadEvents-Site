from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import Usuario


class CadastroUsuarioForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Usuario

        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'tipo_usuario',
            'instituicao',
            'curso',
            'matricula',
            'password1',
            'password2',
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['tipo_usuario'].choices = (
            ('estudante', 'Estudante'),
            ('organizador', 'Organizador'),
        )


class LoginUsuarioForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Usuário'
            }
        )
    )

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Senha'
            }
        )
    )


class PerfilUsuarioForm(forms.ModelForm):

    class Meta:
        model = Usuario

        fields = [
            'first_name',
            'last_name',
            'email',
            'instituicao',
            'curso',
            'matricula',
            'cpf',
        ]

        widgets = {

            'first_name': forms.TextInput(
                attrs={
                    'placeholder': 'Seu nome'
                }
            ),

            'last_name': forms.TextInput(
                attrs={
                    'placeholder': 'Seu sobrenome'
                }
            ),

            'email': forms.EmailInput(
                attrs={
                    'placeholder': 'seuemail@email.com'
                }
            ),

            'instituicao': forms.TextInput(
                attrs={
                    'placeholder': 'Sua instituição de ensino'
                }
            ),

            'curso': forms.TextInput(
                attrs={
                    'placeholder': 'Seu curso'
                }
            ),

            'matricula': forms.TextInput(
                attrs={
                    'placeholder': 'Sua matrícula'
                }
            ),

            'cpf': forms.TextInput(
                attrs={
                    'placeholder': '000.000.000-00',
                    'maxlength': '14',
                    'autocomplete': 'off',
                }
            ),
        }