from django.contrib import admin
from django.urls import path
from mysite import views

admin.site.site_header = "YouCantHack"
admin.site.site_title = "UMSRA Admin Portal"
admin.site.index_title = "Welcome to UMSRA Researcher Portal"

urlpatterns = [
    path("", views.home , name ='home'),
    path('about',views.about,name='about'),
    path('contact',views.contact,name='contact'),
    path('output',views.output,name='output'),
]