from ninja import ModelSchema, Schema
from .models import Item, DasboardSettings

class ItemSchema(ModelSchema):
    class Config:
        model = Item
        model_fields = ['id', 'name', 'desc']


class UserCreateSchema(Schema):
    username: str
    password: str
    email: str

class SettingsSchema(ModelSchema):
    class Config:
        model = DasboardSettings
        model_fields = ['user', 'background_primary', 'foreground_primary']