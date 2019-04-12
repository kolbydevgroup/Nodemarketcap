from rpc2 import *
import mysql_module 
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import config
import json
import datetime
import requests
import time
mysql = mysql_module.Mysql()
def mean(numbers):
	return (float(sum(numbers)) / max(len(numbers), 1)) / 103
	#for Cname in coinNames:     MasternodeList(Cname['name'], Cname['ticker'])

def MasternodeList(coinNames):
	try:
		values_to_insert = []	
		for Cname in coinNames:
			try: 
				print(" ")
				print("Coin name : " + str(Cname['name']))
				rpc = get_rpc(str(Cname['ticker']))
				if (str(Cname['name']) == "smartcash"):
					mnList = rpc.smartnode('list')
				elif (str(Cname['name']) == "zcoin"):
					mnList = rpc.znode('list')
				elif (str(Cname['name']) == "swiftcash"):
					mnList = rpc.swiftnode('list')
				else:
					mnList = rpc.masternode('list')
				
				for coin in mnList:
					if (coin['lastpaid'] == 0):
						lastPaid = ""
					else:
						lastPaid = time.strftime('%b %-d, %Y, %X',time.gmtime(coin['lastpaid']))
						
					values_to_insert.append([Cname['name'], coin['status'], coin['addr'], coin['version'], time.strftime('%b %-d, %Y, %X',time.gmtime(coin['lastseen'])), lastPaid])	
				print('Good to go')
			except Exception:
				pass
		mysql.clearMasternodeList()	
		mysql.addMasternodeList(values_to_insert)
		lastUpdatedMNList = time.strftime('%Y.%m.%d %X',time.gmtime())
		lastUpdatedMNList = str(lastUpdatedMNList) + " UTC"
		mysql.updateMasterNodeUpdateTime(lastUpdatedMNList)				
	except Exception as e:
		print('FAILED2: ' + str(e))
