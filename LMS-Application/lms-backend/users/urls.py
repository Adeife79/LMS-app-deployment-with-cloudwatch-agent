# from django.urls import path
# from .views import user_list_create

# urlpatterns = [
#     path('auth/', user_list_create, name='user_list_create')
# ]

from django.urls import path
from .views import user_list_create, CustomTokenObtainPairView, student_profile, teacher_profile

urlpatterns = [
    path('auth/', user_list_create, name='user_list_create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/student/', student_profile, name='student_profile'),
    path('profile/teacher/', teacher_profile, name='teacher_profile'),
]
