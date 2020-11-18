from .base import *
from decouple import config

DEBUG = config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['*']

print("in prod")

# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
