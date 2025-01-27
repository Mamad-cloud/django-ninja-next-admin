from typing import List

from ninja import Router
from .schemas import ModuleSchema, TeamSchema
from .models import Module, Team

import helpers

router = Router()

@router.get('', auth=helpers.api_auth_user_or_annon, response=List[TeamSchema])
def get_all_teams(request):
    return Team.objects.all()

@router.get('/modules', auth=helpers.api_auth_user_or_annon, response=List[ModuleSchema])
def get_modules(request):
    return Module.objects.all()

