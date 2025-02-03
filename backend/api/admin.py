from django.contrib import admin

from .models import Item, Invoice, DasboardSetting
# Register your models here.
admin.site.register(Item)
admin.site.register(Invoice)
admin.site.register(DasboardSetting)