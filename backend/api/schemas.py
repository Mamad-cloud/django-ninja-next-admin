from ninja import ModelSchema, Schema
from .models import Item, DasboardSetting
from django.contrib.auth.models import User

class ItemSchema(ModelSchema):
    class Config:
        model = Item
        model_fields = ['id', 'name', 'desc']


class UserCreateSchema(Schema):
    name: str
    lastname: str
    username: str
    password: str
    email: str
    modules: str

class UserDetailsSchema(ModelSchema):
    class Config: 
        model = User
        model_fields = ['username', 'first_name', 'last_name', 'email']

class SettingsSchema(ModelSchema):
    class Config:
        model = DasboardSetting
        model_fields = ['user', 'background_primary', 'foreground_primary']