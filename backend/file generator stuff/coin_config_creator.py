from content_management import Content

TOPIC_DICT = Content()

FUNC_TEMPLATE = '''

def CURRENCOINTICKERLOWERCASEInfo() :
	name = 'CURRENTCOINNAME'
	nameb = 'CURRENTCOINB'
	tickerCap = "CURRENTTICKER"
	btt = 'Bitcoin Talk'
	bttb = 'CURRENTBITCOINTALK'
	discord = 'Discord'
	discordb = 'CURRENTCOINDISCORD'
	github = 'Github'
	githubb = 'CURRENTGITHUB'
	twitter = 'twitter'
	twitterb = 'CURRENTTWITTER'
	website = 'Website'
	websiteb = 'CURRENTWEBSITE'
	explorer = 'CURRENTCOINEXPLORER'
	explorerb= 'Explorer' 
	exchange = 'CURRENTEXCHANGE1'
	exchangename = 'CURRENTEXCHANGENAME1' 
	exchangeb = 'CURRENTEXCHANGE2'
	exchangenameb = 'CURRENTEXCHANGENAME2' 
	img16 = "CURRENTCOINNAME"
	page = '/coin/CURRENTCOINNAME/">CURRENTCOINB'
	mysql.check_for_coin(name, nameb, tickerCap, btt, bttb, discord, discordb, github, githubb, twitter, twitterb, website, websiteb, explorer, explorerb, exchange, exchangename, exchangeb, exchangenameb, img16, page)
	try:
		name = 'CURRENTCOINNAME'
		rpc = get_rpc(CURRENCOINTICKERLOWERCASE)

		mncount = rpc.masternode('count')CURRENTISAFORKOFPIVX
		bdonate = rpc.getinfo()['balance']
		donate = str(bdonate)
		blockcount = rpc.getinfo()['blocks']
		blockhash = rpc.getblockhash(blockcount)
		gettransaction = rpc.getblock(blockhash)['tx'][CURRENTWHICHISTHERIGHTTRANSSCTION]
		getrawtran = rpc.getrawtransaction(gettransaction)
		getmasternodeblockreward = rpc.decoderawtransaction(getrawtran)['vout'][CURRENTWHICHISHERIGHTREWARD]['value']
		a = [] # Timestamps
		diff = [] 
		for i in range(14):
			blocksnext = blockcount - i * 103
			blockhash = rpc.getblockhash(blocksnext)
			blockepoch = rpc.getblock(blockhash)['time']
			a.append (blockepoch)
		a.sort()
		print(a)
		prev = 0
		for i in range(len(a)):
			print(a[i], prev)
			if (i > 0):
				diff.append (a[i] - prev)
			prev = a[i]
		avgblock = mean(diff)
		block24hr = 1440 / (avgblock / 60)
		walletversion = rpc.getinfo()['version']
		blockzero = rpc.getblockhash(0)
		getepoch = rpc.getblock(blockzero)['time']
		genesisdate = datetime.datetime.fromtimestamp(getepoch).strftime('%c')	
		# let some daemon time to unlock wallet
		time.sleep(1)
		mnCost = CURRENTMASTERNODECOST
		gravapi = 'https://coinlib.io/api/v1/coin?key=7f291e8e177748eb&pref=BTC&symbol=CURRENTTICKER'
		gravprice = requests.get(gravapi)
		btcapi = 'https://coinlib.io/api/v1/coin?key=7f291e8e177748eb&pref=EUR&symbol=BTC'
		btcprice = requests.get(btcapi)
		btcvalue = btcprice.json()['markets'][1]['price']
		btcval = gravprice.json()['price']
		usdMarketCap = '0'
		btcMarketCap = '0'	
		btcvol = gravprice.json()['total_volume_24h']
		usdvol = float(btcvol) * float(btcvalue)	
		usdvalue = float(btcvalue) * float(btcval)	
		mnpriceusd = float(usdvalue) * float(mnCost)	
		changep = gravprice.json()['delta_24h']
		coinLock = float(mncount) * float(mnCost)
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
		print('removefrommian')
		
		mysql.updateCoinInfo(name, mnRoi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, dailyUSD, dailyBTC, dailyCoin, weeklyUSD, weeklyBTC, weeklyCoin, monthlyUSD, monthlyBTC, monthlyCoin, yearlyUSD, yearlyBTC, yearlyCoin, coinLock, donate,  btcval, usdMarketCap, btcMarketCap, btcvol, blockcount, block24hr, avgblock, walletversion, genesisdate, status)
	except Exception:
		name = 'CURRENTCOINNAME'
		status = "syncing"
		print('movetomain')
		mysql.updateStatus(name, status)
'''

for each_topic in TOPIC_DICT:
	#print(each_topic)

	index_counter = 0
	for eachele in TOPIC_DICT[each_topic]:
		try:
			CURRENTTOPIC = each_topic
			CURRENTCOINNAME = eachele[0]
			CURRENCOINTICKERLOWERCASE = eachele[1]
			CURRENTTICKER = eachele[2]
			CURRENTWHICHISTHERIGHTTRANSSCTION = eachele[3]
			CURRENTWHICHISHERIGHTREWARD = eachele[4]
			CURRENTCOINB = eachele[5]
			CURRENTCOINDISCORD = eachele[6]
			CURRENTBITCOINTALK = eachele[7]
			CURRENTGITHUB = eachele[8]
			CURRENTTWITTER = eachele[9]
			CURRENTWEBSITE = eachele[10]
			CURRENTCOINEXPLORER = eachele[11]
			CURRENTEXCHANGE1 = eachele[12]
			CURRENTEXCHANGENAME1 = eachele[13]
			CURRENTEXCHANGE2 = eachele[14]
			CURRENTEXCHANGENAME2 = eachele[15]
			CURRENTISAFORKOFPIVX = eachele[16]
			CURRENTMASTERNODECOST = eachele[17]		

			print( FUNC_TEMPLATE.replace("CURRENTTOPIC",CURRENTTOPIC).replace("CURRENTCOINNAME",CURRENTCOINNAME).replace("CURRENCOINTICKERLOWERCASE",CURRENCOINTICKERLOWERCASE).replace("CURRENTTICKER",CURRENTTICKER).replace("CURRENTWHICHISTHERIGHTTRANSSCTION",CURRENTWHICHISTHERIGHTTRANSSCTION).replace("CURRENTWHICHISHERIGHTREWARD",CURRENTWHICHISHERIGHTREWARD).replace("CURRENTCOINB",CURRENTCOINB).replace("CURRENTCOINDISCORD",CURRENTCOINDISCORD).replace("CURRENTBITCOINTALK",CURRENTBITCOINTALK).replace("CURRENTGITHUB",CURRENTGITHUB).replace("CURRENTTWITTER",CURRENTTWITTER).replace("CURRENTWEBSITE",CURRENTWEBSITE).replace("CURRENTCOINEXPLORER",CURRENTCOINEXPLORER).replace("CURRENTEXCHANGE1",CURRENTEXCHANGE1).replace("CURRENTEXCHANGENAME1",CURRENTEXCHANGENAME1).replace("CURRENTEXCHANGE2",CURRENTEXCHANGE2).replace("CURRENTEXCHANGENAME2",CURRENTEXCHANGENAME2).replace("CURRENTISAFORKOFPIVX",CURRENTISAFORKOFPIVX).replace("CURRENTMASTERNODECOST",CURRENTMASTERNODECOST) )

		except Exception as e:
			print(str(e))	  
	  
