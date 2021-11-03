from django.conf.urls import url
from app import views

urlpatterns = [
    url(r'^api/pet$', views.pet_all),
    url(r'^api/pet/(?P<pk>[0-9]+)$', views.pet_detail),
    url(r'^api/pet/search$', views.pet_search)
]