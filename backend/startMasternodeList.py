from getMasternodeList import *
import database
import asyncio

import time	
database.run()


try:
    coinNames = mysql.getMasternodeList()
    MasternodeList(coinNames)
except Exception:
    pass
