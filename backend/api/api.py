from ninja import NinjaAPI
from .models import Item
from .schemas import ItemSchema

# instantiating our ninja api class instance 
api = NinjaAPI()

# returns all items 
@api.get('/items', response=list[ItemSchema])
def list_items(request):
    return Item.objects.all()

# creates an item
@api.post('/items', response=ItemSchema)
def create_item(request, item: ItemSchema):
    return Item.objects.create(**item.dict())