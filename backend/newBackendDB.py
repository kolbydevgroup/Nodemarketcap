from rpc2 import *
import mysql_module 
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import config
import json
import datetime
import requests
import time
mysql = mysql_module.Mysql()


btcapi = 'https://coinlib.io/api/v1/coin?key=7f291e8e177748eb&pref=USD&symbol=BTC'
btcprice = requests.get(btcapi)

def mean(numbers):
	return (float(sum(numbers)) / max(len(numbers), 1)) / 103
	
def coinInfo(name, ticker, mnCost, priceApi, priceApiLink, coinType, getBlockDataType, TxData1, TxData2, explorerTotalLink, explorerType):
	try:
		print(" ")
		print("Coin name : " + str(name))

		if (explorerType == 0):
			explorerapi = str(explorerTotalLink)
			explorerprice = requests.get(explorerapi)
			totalSupply = explorerprice.json()
		elif (explorerType == 1):
			explorerapi = str(explorerTotalLink)
			explorerprice = requests.get(explorerapi)
			totalSupply = explorerprice.json()['supply']
		elif (explorerType == 2):
			explorerapi = str(explorerTotalLink)
			explorerprice = requests.get(explorerapi)
			totalSupply = explorerprice.json()['totalSupply']
		elif (explorerType == 3):
			explorerapi = str(explorerTotalLink)
			explorerprice = requests.get(explorerapi)
			totalSupply = explorerprice.json()['total']
		else:
			totalSupply = 0
			
		rpc = get_rpc(str(ticker))
		if (coinType == 0):
			mncount = rpc.masternode('count')
		elif (coinType == 1):
			mncount = rpc.masternode('count')['enabled']
		elif (coinType == 2):
			mncount = rpc.smartnode('count')
		elif (coinType == 3):
			mncount = rpc.znode('count')
		elif (coinType == 4):
			mncount = rpc.swiftnode('count')['enabled']
		elif (coinType == 5):
			mncount = len(rpc.masternode('list'))
		else:
			mncount = 0
		#normal config for info
		if (getBlockDataType == 0):
			bdonate = rpc.getinfo()['balance']
			donate = str(bdonate)
			blockcount = rpc.getinfo()['blocks']
			blockhash = rpc.getblockhash(blockcount)
			gettransaction = rpc.getblock(blockhash)['tx'][int(TxData1)]
			getrawtran = rpc.getrawtransaction(gettransaction)
			getmasternodeblockreward = rpc.decoderawtransaction(getrawtran)['vout'][int(TxData2)]['value']
			a = [] # Timestamps
			diff = [] 
			for i in range(14):
				blocksnext = blockcount - i * 103
				blockhash = rpc.getblockhash(blocksnext)
				blockepoch = rpc.getblock(blockhash)['time']
				a.append (blockepoch)
			a.sort()
			prev = 0
			for i in range(len(a)):
				if (i > 0):
					diff.append (a[i] - prev)
				prev = a[i]
			avgblock = mean(diff)
			block24hr = 1440 / (avgblock / 60)
			walletversion = rpc.getinfo()['version']
			blockzero = rpc.getblockhash(0)
			getepoch = rpc.getblock(blockzero)['time']
			genesisdate = datetime.datetime.fromtimestamp(getepoch).strftime('%Y.%-m.%-d %X')
		#dynamic config for info
		elif (getBlockDataType == 1):
			mnlist = rpc.masternode('list')
			bdonate = rpc.getwalletinfo()['balance']
			donate = str(bdonate)
			blockcount = rpc.getblockchaininfo()['blocks']
			mntotalcolate = 0
			for mns in mnlist:
				txid = mns.split('-')[0]
				txindex = mns.split('-')[1]
				getrawtran = rpc.getrawtransaction(txid)
				getmasternodecolaterol = rpc.decoderawtransaction(getrawtran)['vout'][int(txindex)]['value']
				mntotalcolate = mntotalcolate + getmasternodecolaterol
			mnavgcolate = mntotalcolate / mncount
			a = [] # Timestamps
			diff = [] 
			for i in range(14):
				blocksnext = blockcount - i * 103
				blockhash = rpc.getblockhash(blocksnext)
				blockepoch = rpc.getblock(blockhash)['time']
				a.append (blockepoch)
			a.sort()
			prev = 0
			for i in range(len(a)):
				if (i > 0):
					diff.append (a[i] - prev)
				prev = a[i]
			avgblock = mean(diff)
			a = 0
			for i in range(144):
				blocksnext = (blockcount - i * 10)  - 5
				blockhash = rpc.getblockhash(blocksnext)
				gettransaction = rpc.getblock(blockhash)['tx'][int(TxData1)]
				getrawtran = rpc.getrawtransaction(gettransaction)
				getmasternodeblockpart = rpc.decoderawtransaction(getrawtran)['vout'][int(TxData2)]['value']
				a = a + getmasternodeblockpart
			getmasternodeblockreward2 = a / 144
			a = 0
			for i in range(144):
				blocksnext = blockcount - i * 10
				blockhash = rpc.getblockhash(blocksnext)
				gettransaction = rpc.getblock(blockhash)['tx'][int(TxData1)]
				getrawtran = rpc.getrawtransaction(gettransaction)
				getmasternodeblockpart = rpc.decoderawtransaction(getrawtran)['vout'][int(TxData2)]['value']
				a = a + getmasternodeblockpart
			getmasternodeblockreward1 = a / 144
			getmasternodeblockreward = (getmasternodeblockreward1 + getmasternodeblockreward2) / 2
			block24hr = 1440 / (avgblock / 60)
			walletversion = rpc.getnetworkinfo()['version']
			blockzero = rpc.getblockhash(0)
			getepoch = rpc.getblock(blockzero)['time']
			genesisdate = datetime.datetime.fromtimestamp(getepoch).strftime('%Y.%-m.%-d %X')	
			mnCost = rpc.masternode('collateral')
		# let some daemon time to unlock wallet
		time.sleep(1)
		# coin gecko get info
		if (priceApi == 0):
			gravapi = str(priceApiLink)
			gravprice = requests.get(gravapi)
			btcvalue = btcprice.json()['markets'][0]['price']
			btcval = gravprice.json()['market_data']['current_price']['btc']
			usdMarketCap = float(btcval) * float(btcvalue) * float(totalSupply)
			btcMarketCap = float(btcval) * float(totalSupply)
			btcvol = gravprice.json()['market_data']['total_volume']['btc']
			usdvol = float(btcvol) * float(btcvalue)	
			usdvalue = float(btcvalue) * float(btcval)	
			mnpriceusd = float(usdvalue) * float(mnCost)	
			changep = gravprice.json()['market_data']['price_change_percentage_24h']
			if (getBlockDataType == 1):
				coinLock = float(mncount) * float(mnavgcolate)
			else:
				coinLock = float(mncount) * float(mnCost)
			#coinlib get price data
		elif (priceApi == 1):
			gravapi = str(priceApiLink)
			gravprice = requests.get(gravapi)
			btcvalue = btcprice.json()['markets'][0]['price']
			btcval = gravprice.json()['price']
			usdMarketCap = float(btcval) * float(btcvalue) * float(totalSupply)
			btcMarketCap = float(btcval) * float(totalSupply)
			btcvol = gravprice.json()['total_volume_24h']
			usdvol = float(btcvol) * float(btcvalue)	
			usdvalue = float(btcvalue) * float(btcval)	
			mnpriceusd = float(usdvalue) * float(mnCost)	
			changep = gravprice.json()['delta_24h']
			if (getBlockDataType == 1):
				coinLock = float(mncount) * float(mnavgcolate)
			else:
				coinLock = float(mncount) * float(mnCost)
			# if coin has no exhanges
		elif (priceApi == 99):
			btcvalue = 0
			btcval = 0
			usdMarketCap = '0'
			btcMarketCap = '0'	
			btcvol = 0
			usdvol = 0
			usdvalue = 0
			mnpriceusd = 0
			changep = 0
			if (getBlockDataType == 1):
				coinLock = float(mncount) * float(mnavgcolate)
			else:
				coinLock = float(mncount) * float(mnCost)
			#if coin has no exhanges
		if (priceApi == 99):
			dailyCoin = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount)))	
			dailyBTC = 0
			dailyUSD = 0
			mnRoi = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount)) * 365) / float(mnCost) * 100		
			weeklyUSD = 0
			weeklyBTC = 0
			weeklyCoin = dailyCoin * 7
			monthlyUSD = 0
			monthlyBTC = 0
			monthlyCoin = dailyCoin * 30
			yearlyUSD = 0
			yearlyBTC = 0
			yearlyCoin = dailyCoin * 365		
			#else coin has an exchange
		else:
			dailyUSD = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount)) * float(btcval) * float(btcvalue))
			dailyBTC = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount))* float(btcval))
			dailyCoin = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount)))	
			mnRoi = (((float(block24hr) * float(getmasternodeblockreward)) / float(mncount)) * 365) / float(mnCost) * 100		
			weeklyUSD = dailyUSD * 7
			weeklyBTC = dailyBTC * 7
			weeklyCoin = dailyCoin * 7
			monthlyUSD = dailyUSD * 30
			monthlyBTC = dailyBTC * 30
			monthlyCoin = dailyCoin * 30
			yearlyUSD = dailyUSD * 365
			yearlyBTC = dailyBTC * 365
			yearlyCoin = dailyCoin * 365
		status = "online"
		print('Good to go')
		lastUpdateCoinStats = time.strftime('%Y.%m.%d %X',time.gmtime())
		lastUpdateCoinStats = str(lastUpdateCoinStats) + " UTC"		
		mysql.updateCoinsUpdateTime(name, lastUpdateCoinStats)
		mysql.updateCoinInfo(name, mnRoi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, dailyUSD, dailyBTC, dailyCoin, weeklyUSD, weeklyBTC, weeklyCoin, monthlyUSD, monthlyBTC, monthlyCoin, yearlyUSD, yearlyBTC, yearlyCoin, coinLock, donate,  btcval, usdMarketCap, btcMarketCap, btcvol, blockcount, block24hr, avgblock, walletversion, genesisdate, status)
	except Exception as e:
		status = "syncing"
		print('FAILED: ' + str(e))
		mysql.updateStatus(name, status)
