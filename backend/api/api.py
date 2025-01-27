
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from ninja import Router
from .models import Item, DasboardSettings
from .schemas import ItemSchema, UserCreateSchema, SettingsSchema

import helpers

# instantiating our ninja api class instance 
router = Router()

# returns all items 
@router.get('/items', response=list[ItemSchema])
def list_items(request):
    return Item.objects.all()

# returns item with "id" or throws 404 
@router.get('/items/{id}/', response=ItemSchema)
def list_items(request, id: int):
    return get_object_or_404(Item, pk=id)

# creates an item
@router.post('/items', response=ItemSchema)
def create_item(request, item: ItemSchema):
    return Item.objects.create(**item.dict())


@router.post("/register")
def register(request, user: UserCreateSchema):
    if User.objects.filter(username=user.username).exists():
        return {"error": "Username already exists"}
    if User.objects.filter(email=user.email).exists():
        return {"error": "Email already exists"}

    new_user = User.objects.create(
        username=user.username,
        password=make_password(user.password),
        email=user.email
    )
    return {"message": "User registered successfully"}

@router.post("/settings", response=SettingsSchema, auth=helpers.api_auth_user_required)
def set_settings(request, settings: SettingsSchema):
    # DasboardSettings.objects.get(user=request.user)
    DasboardSettings.objects.update_or_create(user=request.user, background_primary=settings.background_primary, foreground_primary=settings.foreground_primary)