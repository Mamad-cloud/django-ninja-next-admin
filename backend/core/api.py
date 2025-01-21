import helpers

from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

from api.api import router as api_router

api = NinjaExtraAPI(csrf=True)
api.register_controllers(NinjaJWTDefaultController)
api.add_router('/api/', api_router, auth=helpers.api_auth_user_or_annon)



