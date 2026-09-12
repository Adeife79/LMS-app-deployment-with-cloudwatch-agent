from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Course, Category, Lessons, Material, Enrollment, QuestionAnswer
from .serializers import CourseSerializers, CategorySerializers, LessonsSerializers, MaterialSerializers, EnrollmentSerializers, QuestionAnswerSerializers


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def category_list_create(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializers(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if request.user.role != 'admin':
            return Response({'detail': "only admin can create categories"}, status=403)
        serializer = CategorySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def course_list_create(request):
    if request.method == 'GET':
        if request.user.role in ['admin', 'student']:
            course = Course.objects.all()
        elif request.user.role == 'teacher':
            course = Course.objects.filter(instructor_id=request.user)
        else:
            return Response({'detail': "Unauthorized role"}, status=403)
        serializer = CourseSerializers(course, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        if request.user.role != 'teacher':
            return Response({'detail': "only teachers can create courses"}, status=403)
        serializer = CourseSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor_id=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def course_detail(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'detail': 'Course not found'}, status=404)
    
    if request.method == 'GET':
        if request.user.role == 'admin' or request.user == course.instructor_id:
            serializer = CourseSerializers(course)
            return Response(serializer.data)
        return Response({'detail': "Permission denied!!"}, status=403)
    
    elif request.method == 'PUT':
        if request.user.role != 'teacher' or request.user != course.instructor_id:
            return Response({'detail': 'only course teacher can update this course'}, status=403)
        serializer = CourseSerializers(course, data= request.data)
        if serializer.is_valid():
            serializer.save(instructor_id=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if request.user.role != 'teacher' or request.user != course.instructor_id:
            return Response({'detail': 'only course teacher can delete this course'}, status=403)
        course.delete()
        return Response({'detail': 'course deleted !'}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def lesson_list_create(request):
    if request.method == 'GET':
        categories = Lessons.objects.all()
        serializer = LessonsSerializers(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = LessonsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def material_list_create(request):
    if request.method == 'GET':
        categories = Material.objects.all()
        serializer = MaterialSerializers(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MaterialSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def enrollment_list_create(request):
    if request.method == 'GET':
        categories = Enrollment.objects.all()
        serializer = EnrollmentSerializers(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EnrollmentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def questionanswer_list_create(request):
    if request.method == 'GET':
        categories = QuestionAnswer.objects.all()
        serializer = QuestionAnswerSerializers(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = QuestionAnswerSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)