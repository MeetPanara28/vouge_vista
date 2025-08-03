from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers
from .models import *
import logging
import os
import tempfile
from datetime import datetime


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        number = data.get('number')
        passward = data.get('password')
        USER.objects.create(name=name,number=number,email=email,passward=passward)
        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        email1 = data.get('email')
        passward1 = data.get('password')
        e1= serializers.serialize('json', USER.objects.filter(email=email1,passward=passward1))
        if e1 is not None:
            return JsonResponse(e1,safe=False)
        else:
            return JsonResponse(e1,safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})  

def del_data(request):
    # ADMIN.objects.all().delete() 
    if request.method=='GET':
        # PRODUCT.objects.all().delete()
        Buy.objects.all().delete()
        # USER.objects.all().delete()
        # APPOINTMENT.objects.all().delete()
        # APPOINTMENT_DETAILS.objects.all().delete()
        return True
    return True


@csrf_exempt
def up_product(request):
    if request.method == 'POST':
        try:
            print(request.POST)
            name = request.POST.get('name')
            image = request.FILES.get('image')
            price = request.POST.get('price')
            cat = request.POST.get('categorie')

            if not name or not image or not price or not cat:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            img_model = PRODUCT(name=name, image=image, price=price, categorie=cat)
            img_model.save()

            return JsonResponse({
                'id': img_model.id,
                'name': img_model.name,
                'image': img_model.image.url,
                'price': img_model.price,
                'categorie': img_model.categorie
            })

        except Exception as e:
            print(f"Error uploading image: {str(e)}")
            return JsonResponse({'error': 'Internal server error.'}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def get_product(request):
    if request.method == 'POST':
        cat = request.POST.get('categorie')
        images = PRODUCT.objects.filter(categorie=cat)
        print(cat)
        image_data = [
            {
                'id': img.id,
                'name': img.name,
                'image': img.image.url,
                'categorie':img.categorie,
                'price':img.price
            }
            for img in images
        ]
        return JsonResponse(image_data, safe=False) 
    return JsonResponse({'error': 'Invalid request method'}, status=400)  

@csrf_exempt
def admin_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        passward = data.get('password')
        ADMIN.objects.create(name=name,email=email,passward=passward)


        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def admin_login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        email1 = data.get('email')
        passward1 = data.get('password')
        e1= serializers.serialize('json', ADMIN.objects.filter(email=email1,passward=passward1))
        if e1 is not None:
            return JsonResponse(e1,safe=False)
        else:
            return JsonResponse(e1,safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def get_all_products(request):
    if request.method == 'GET':
        products = PRODUCT.objects.all()
        product_data = [
            {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'image': product.image.url if product.image else '',
                'categorie': product.categorie,
            }
            for product in products
        ]
        print(product_data)
        return JsonResponse(product_data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def place_order(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        address = request.POST.get('address')
        product_name = request.POST.get('product_name')
        price = request.POST.get('price')
        print(price)
        print(product_name)
        Buy.objects.create(
            name=name,
            email=email,
            address=address,
            product_name=product_name,
            price=price
        )

        return JsonResponse({'status': 'success', 'message': 'Order placed successfully'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def get_all_buyers(request):
    buyers = Buy.objects.all().values()  # You can filter or order if needed
    return JsonResponse(list(buyers), safe=False)