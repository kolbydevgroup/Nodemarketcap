from newCoinDB import *
import database
import asyncio

import time	
database.run()
try:
    swiftInfo()
except Exception:
    pass