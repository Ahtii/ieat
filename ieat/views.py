from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.core.mail import get_connection, EmailMultiAlternatives
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.html import strip_tags
from ieat import settings

sheet = settings.base.CLIENT.open(settings.base.SHEET_NAME).sheet1

def index(request):				
	return render(request, "index.html")

def faq(request):
	return render(request, "faq.html")

def register_customer(request):	
	data = {
		'name': request.POST.get("name").lower(),
		'phone': request.POST.get("phone"),		
		'occupation': request.POST.get("occupation").lower(),
		'heard_from': request.POST.get("heard-from").lower()
	}
	email = request.POST.get("email")
	if email:
		data.update({"email": email.lower()})
	response = {}	
	try:		
		db_customer = Customer.objects.filter(phone=data["phone"]).first()				
		if db_customer is None:				
			customer = Customer(**data)						
			customer.save()					
			formatted_date = customer.submit_date.strftime("%b %d %Y")
			# save customer to sheets	
			sheet.append_row(
				[
					customer.name,
					customer.phone,
					customer.email,
					customer.occupation,
					customer.heard_from,
					formatted_date
				], 
				table_range='A:F'
			)
		else:
			response = {"error": "Phone already registered.", "type": "existing"}
	except:
		response = {"error": "Something went wrong.", "type": ""}
	print("response is ")
	print(response)	
	return JsonResponse(response)

def register_restaurant(request):
	data = {
		'name': request.POST.get("name").lower(),
		'phone': request.POST.get("phone"),
		'address': request.POST.get("address").lower(),
		'heard_from': request.POST.get("heard-from").lower()
	}
	email = request.POST.get("email")
	if email:
		data.update({"email": email.lower()})
	response = {}
	try:		
		db_restaurant = Restaurant.objects.filter(phone=data["phone"]).first()
		if db_restaurant is None:
			restaurant = Restaurant(**data)			
			restaurant.save()
			formatted_date = restaurant.submit_date.strftime("%b %d %Y")
			# save restaurant to sheets	
			sheet.append_row(
				[
					restaurant.name,
					restaurant.phone,
					restaurant.email,
					restaurant.address,
					restaurant.heard_from,
					formatted_date
				], 
				table_range='H:M'
			)
		else:
			response = {"error": "Phone already registered.", "type": "existing"}	
	except:
		response = {"error": "Something went wrong.", "type": ""}
	return JsonResponse(response)