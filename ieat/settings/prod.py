from .base import *

DEBUG = config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['.vercel.app']
