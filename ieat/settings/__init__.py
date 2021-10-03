from .base import *

if config('RUNTIME_MODE') == 'dev':
    from .dev import *
else:
    from .prod import *
