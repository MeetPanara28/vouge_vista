from django.db import models

class USER(models.Model):
    name=models.CharField(max_length=100)
    number=models.CharField(max_length=10)
    email=models.CharField(max_length=50)
    passward=models.CharField(max_length=15)


class ADMIN(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=50)
    passward=models.CharField(max_length=15)

class PRODUCT(models.Model):
    name=models.CharField(max_length=100)   
    price=models.CharField(max_length=50)
    image = models.ImageField(upload_to='media/')  
    categorie = models.CharField(max_length=100)

class Buy(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=50)
    address=models.CharField(max_length=500)
    product_name=models.CharField(max_length=100)
    price=models.CharField(max_length=50)