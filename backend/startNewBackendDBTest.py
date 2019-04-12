from newBackendDB import *
import database
import asyncio

import time	
database.run()


try:
    name = ""
    coinNames = mysql.getNewBackInput2(name)
    for Cname in coinNames:
        coinInfo(Cname['name'], Cname['ticker'], Cname['mnCost'], Cname['priceApi'], Cname['priceApiLink'], Cname['coinType'], Cname['getBlockDataType'], Cname['TxData1'], Cname['TxData2'], Cname['explorerTotalLink'], Cname['explorerType'])
except Excepn:
    pass
