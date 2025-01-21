from django.shortcuts import get_object_or_404

from ninja import Router
from .models import Item
from .schemas import ItemSchema

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