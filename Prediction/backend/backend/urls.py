from django.urls import path,include

urlpatterns = [

    path('api/',include('prediction.urls')),   
    path('api/',include('chatapp.urls')),
    path('api/',include('voiceapp.urls')),
    
]
