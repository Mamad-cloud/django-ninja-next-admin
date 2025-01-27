from django.contrib import admin
from .models import Module, Team, TeamMembers, TeamMemberModules

# Register your models here.
admin.site.register(Module)
admin.site.register(Team)
admin.site.register(TeamMembers)
admin.site.register(TeamMemberModules)
