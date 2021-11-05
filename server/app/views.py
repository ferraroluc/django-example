from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from app.models import Pet
from app.serializers import PetSerializer

import logging
logger = logging.getLogger(__name__)

@api_view(['GET', 'POST'])
def pet_all(request):
    if request.method == 'GET':
        pet = Pet.objects.all()
        serializer = PetSerializer(pet, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = request.data
        serializer = PetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET', 'PUT', 'DELETE'])
def pet_detail(request, pk):
    try:
        pet = Pet.objects.get(pk=pk)
    except Pet.DoesNotExist:
        return JsonResponse({'message': 'Pet not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PetSerializer(pet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data
        serializer = PetSerializer(pet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pet.delete()
        return JsonResponse({'message': 'Pet was deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def pet_search(request):
    if request.method == 'GET':
        filters = {}

        for key, value in request.GET.items():
            if value != '':
                filters[key] = value
        pets = Pet.objects.filter(**filters)
        
        serializer = PetSerializer(pets, many=True)
        return JsonResponse(serializer.data, safe=False)