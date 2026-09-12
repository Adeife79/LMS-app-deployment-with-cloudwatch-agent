from django.contrib import admin
from .models import Course, Category, Lessons, Material, Enrollment, QuestionAnswer

# Register your models here.
admin.site.register(Course)
admin.site.register(Category)
admin.site.register(Lessons)
admin.site.register(Material)
admin.site.register(Enrollment)
admin.site.register(QuestionAnswer)