from typing import List

from ninja import Router
from .schemas import ModuleSchema, TeamSchema, ProductSchema, ProductGetSchema, ProductCreateSchema, Error, Message
from .models import Module, Team, TeamMemberModule, TeamMember, Product

import helpers

router = Router()

@router.get('', auth=helpers.api_auth_user_or_annon, response=List[TeamSchema])
def get_all_teams(request):
    return Team.objects.all()

@router.get('/modules', auth=helpers.api_auth_user_or_annon, response=List[ModuleSchema])
def get_modules(request):
    return Module.objects.all()

@router.get('/user/teams', response=List[TeamSchema], auth=helpers.api_auth_user_required)
def get_user_teams(request):
    user_teams = TeamMember.objects.filter( member=request.user)
    teams = []
    teams.append(Team.objects.get(leader=request.user))

    for team in user_teams:
        teams.append(team.team)

    return teams

@router.get('/user/modules', response=List[ModuleSchema], auth=helpers.api_auth_user_required)
def get_user_modules(request):
    team = Team.objects.get(leader=request.user)
    member_modules = TeamMemberModule.objects.filter(team=team, member=request.user)
    modules = []
    
    for module in member_modules:
        modules.append(module.module)

    return modules

@router.get('/{team_id}/products', auth=helpers.api_auth_user_required, response=List[ProductGetSchema])
def get_all_team_products(request, team_id: int):
    team = Team.objects.get(pk=team_id)
    if (TeamMember.objects.filter(team=team, member=request.user).exists() or team.leader == request.user):
        db_products = Product.objects.filter(team=team)
        products: List[ProductGetSchema] = []
    
        for prod in db_products:
            products.append({
                'name': prod.name,
                'price': prod.price,
                'quantity': prod.quantity,
                'username': prod.user.username,
                'team': prod.team.name
            })
        return products
    else: 
        return []


@router.get('/products', auth=helpers.api_auth_user_required, response=List[ProductGetSchema])
def get_all_products(request):
    db_products = Product.objects.all()
    products: List[ProductGetSchema] = []
    
    for prod in db_products:
        products.append({
            'name': prod.name,
            'price': prod.price,
            'quantity': prod.quantity,
            'username': prod.user.username,
            'team': prod.team.name
        })
    
    return products

@router.post('/products', auth=helpers.api_auth_user_required, response=ProductSchema)
def create_products(request, product: ProductCreateSchema):
    team = Team.objects.get(name=product.team)
    if (TeamMember.objects.filter( team=team, member=request.user ).exists() or team.leader == request.user): 

        return Product.objects.create( 
            name=product.name, 
            price=product.price, 
            quantity=product.quantity, 
            user=request.user,
            team=team
        )




@router.delete('/products/{name}', auth=helpers.api_auth_user_required, response={200: Message, 401: Error})
def delete_product(request, name: str):
    product = Product.objects.get(name=name)
    if (product and  product.user == request.user):
        product.delete()
        return 200, { 'message': 'product deleted'}
    else: 
        return 401, { 'message': 'you can only delete your own products'}
