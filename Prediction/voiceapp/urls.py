from django.urls import path
from .views import VoiceBotView, VoiceCommand

urlpatterns = [
    path('voice/', VoiceBotView.as_view(), name='voice_bot'),
    path('bot/cmd/',VoiceCommand.as_view(), name='voice-command')
]