from ninja import ModelSchema
from .models import Module, Team

class ModuleSchema(ModelSchema):
    class Config:
        model = Module
        model_fields = ['name']

class TeamSchema(ModelSchema):
    class Config:
        model = Team
        model_fields = ['name', 'leader']