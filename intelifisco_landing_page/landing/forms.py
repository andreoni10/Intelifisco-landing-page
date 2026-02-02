from django import forms
from django.core import validators
from django.utils.translation import gettext_lazy as _


class FormContact(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={
        'type': 'text',
        'id': 'name',
        'name': 'name',
        'placeholder': _('Digite seu nome')
    }))
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'type': 'email',
        'id': 'email',
        'name': 'email',
        'placeholder': _('Digite seu email')
    }))
    telephone = forms.CharField(widget=forms.TextInput(attrs={
        'type': 'tel',
        'id': 'telefone',
        'name': 'telefone',
        'placeholder': _('Digite seu telefone')
    }))
    text = forms.CharField(required=False, widget=forms.Textarea(attrs={
        'id': 'message',
        'name': 'message',
        'placeholder': _('Digite sua mensagem'),
        'rows': "5"
    }))

    def clean(self):
        all_clean_data = super().clean()
        email = all_clean_data['email']
