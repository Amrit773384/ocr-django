from django.shortcuts import render
# Create your views here.
import PIL
from datetime import date
from django.core.files.storage import FileSystemStorage
from mysite.ocr import ocr
import os 
from mysite.models import Contact
from django.contrib import messages
from django.http import HttpResponseRedirect

BASE_DIR = os.getcwd()


def home(request):
    if request.method == 'POST':
        uploaded_img = request.FILES['image']
        path = os.path.join(BASE_DIR,'temp',uploaded_img.name)
        fs = FileSystemStorage()
        if not os.path.exists(path):
            fs.save(uploaded_img.name,uploaded_img)
        text = ocr(path)
        fs.delete(uploaded_img.name)
        context = {
            'output':str(text)
        }
        return render(request,'index.html',context)
    return render(request,'index.html')
def about(request):
    return render(request, 'about.html')
def contact(request):
    if request.method == "POST":
        try:
            name = request.POST.get('name','none')
            email = request.POST.get('email','none')
            message = request.POST.get('message','none')
            print(message)
            entry = Contact(Name=name,Email=email,Message=message)
            entry.save()
            return render(request, 'contact.html',{"status":0})
        except Exception as e:
            print(e)
            return render(request, 'contact.html',{"status":1})
    return render(request, 'contact.html',{"status":"null"})