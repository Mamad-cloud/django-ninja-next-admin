
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from ninja import Router
from .models import Item, DasboardSetting
from teams.models import Team, TeamMemberModule, Module
from .schemas import ItemSchema, UserCreateSchema, SettingsSchema, UserDetailsSchema

import helpers
from typing import Optional
# instantiating our ninja api class instance 
router = Router()

# returns all items 
@router.get('/items', response=list[ItemSchema])
def get_item(request, item_id: Optional[int] = None):
    if item_id is not None:
        return Item.objects.filter(id=item_id)
    return Item.objects.all()

# returns item with "id" or throws 404 
@router.get('/items/{id}/', response=ItemSchema)
def list_item(request, id: int):
    return get_object_or_404(Item, pk=id)

# creates an item
@router.post('/items', response=ItemSchema)
def create_item(request, item: ItemSchema):
    return Item.objects.create(**item.dict())

@router.get('/user', response=UserDetailsSchema, auth=helpers.api_auth_user_required)
def get_user_details(request):
    return request.user



@router.post("/register")
def register(request, user: UserCreateSchema):
    if User.objects.filter(username=user.username).exists():
        return {"error": "Username already exists"}
    if User.objects.filter(email=user.email).exists():
        return {"error": "Email already exists"}

    new_user = User.objects.create(
        first_name=user.name,
        last_name=user.lastname,
        username=user.username,
        password=make_password(user.password),
        email=user.email
    )

    team = Team.objects.create( name=f"{new_user.username}'s team", leader=new_user)
    modules = user.modules.split(',')
    for module in modules:
        _module = Module.objects.get(name=module)
        TeamMemberModule.objects.create(team=team, member=new_user, module=_module)
    
    return {
        "message": "User registered successfully",
        "username": new_user.username
    }

@router.post("/settings", response=SettingsSchema, auth=helpers.api_auth_user_required)
def set_settings(request, settings: SettingsSchema):
    # DasboardSettings.objects.get(user=request.user)
    DasboardSetting.objects.update_or_create(user=request.user, background_primary=settings.background_primary, foreground_primary=settings.foreground_primary)