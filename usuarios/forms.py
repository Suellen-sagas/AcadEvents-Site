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

        fields = (
            'first_name',
            'last_name',
            'email',
            'instituicao',
            'curso',
            'matricula',
        )

        labels = {
            'first_name': 'Nome',
            'last_name': 'Sobrenome',
            'email': 'E-mail',
            'instituicao': 'Instituição',
            'curso': 'Curso',
            'matricula': 'Matrícula',
        }