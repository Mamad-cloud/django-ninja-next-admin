from django.contrib import admin

from .models import Item, Invoice, DasboardSettings
# Register your models here.
admin.site.register(Item)
admin.site.register(Invoice)
admin.site.register(DasboardSettings)