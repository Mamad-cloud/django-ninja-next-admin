from django.contrib import admin
from .models import Module, Team, TeamMember, TeamMemberModule, Product

# Register your models here.
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name')

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'leader')  # Display team name and leader in admin list
    search_fields = ('name', 'leader__username')  # Allow searching by name and leader username

class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('team', 'member')  # Show the team and its members
    search_fields = ('team__name', 'member__username')


class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Display module names
    search_fields = ('name',)


class TeamMemberModuleAdmin(admin.ModelAdmin):
    list_display = ('team', 'member', 'module')  # Show which module belongs to which team member
    search_fields = ('team__name', 'member__username', 'module__name')
    list_filter = ('team', 'module')  # Add filters to make searching easier

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'team', 'user')
    search_fields = ('name', 'team__name', 'user__username', 'price')
    list_filter = ('team', 'user', 'price', 'quantity')

admin.site.register(Module, ModuleAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(TeamMemberModule, TeamMemberModuleAdmin)
admin.site.register(Product, ProductAdmin)
