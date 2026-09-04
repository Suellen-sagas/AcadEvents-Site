from django.urls import path

from . import views


app_name = 'planos'


urlpatterns = [

    path(
        '',
        views.escolher_plano,
        name='escolher'
    ),

]