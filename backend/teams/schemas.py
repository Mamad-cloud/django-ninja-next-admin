from ninja import ModelSchema, Schema
from .models import Module, Team, Product

class ModuleSchema(ModelSchema):
    class Config:
        model = Module
        model_fields = ['name']

class TeamSchema(ModelSchema):
    class Config:
        model = Team
        model_fields = ['id', 'name', 'leader']

class ProductSchema(ModelSchema):
    class Config:
        model = Product
        model_fields = ['name', 'price', 'quantity', 'user', 'team']

class ProductGetSchema(Schema):
    name: str
    price: int
    quantity: int
    username: str
    team: str

class ProductCreateSchema(Schema):
    name: str
    price: int
    quantity: int
    team: str
