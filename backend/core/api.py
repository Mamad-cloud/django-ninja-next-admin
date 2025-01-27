import helpers

from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

from api.api import router as api_router
from teams.api import router as teams_router

# TODO: enable csrf for added security, to do this we need to obtain the token from an unprotected endpoint 
#api = NinjaExtraAPI(csrf=True)
# https://django-ninja.dev/reference/csrf/

api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router('', api_router, auth=helpers.api_auth_user_or_annon)
api.add_router('/teams', teams_router, auth=helpers.api_auth_user_or_annon)


