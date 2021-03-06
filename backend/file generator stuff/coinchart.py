from content_management import Content

TOPIC_DICT = Content()

FUNC_TEMPLATE = '''

def CURRENCOINTICKERLOWERCASEInfo() :	
	try:
		name = 'CURRENTCOINNAME'
		con = connection()
		c = con.cursor()
		to_exec = "SELECT mncount from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		mncount, = c.fetchone()
		to_exec = "SELECT roi from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		roi, = c.fetchone()
		to_exec = "SELECT usdvalue from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		priceusd, = c.fetchone()
		to_exec = "SELECT btcval from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		pricebtc, = c.fetchone()
		to_exec = "SELECT dailyCoin from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		dailycoin, = c.fetchone()
		to_exec = "SELECT monthlyCoin from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		monthlycoin, = c.fetchone()
		to_exec = "SELECT yearlyCoin from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		yearlycoin, = c.fetchone()
		c.close()
		con.close()		
		mysql.addChartCURRENTCOINNAME(dateAdded, mncount, roi, priceusd, pricebtc, dailycoin, monthlycoin, yearlycoin)
	except Exception:
		pass
		

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
	  