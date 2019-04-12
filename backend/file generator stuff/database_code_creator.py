from content_management import Content

TOPIC_DICT = Content()

FUNC_TEMPLATE = '''

        cursor.execute("""CREATE TABLE IF NOT EXISTS CURRENTCOINNAME (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			date VARCHAR(60),
			mncount BIGINT UNSIGNED,
			roi DECIMAL(6, 2),
			priceusd DECIMAL(20, 3),
			pricebtc DECIMAL(20, 8),
			dailycoin DECIMAL(20, 4),
			monthlycoin DECIMAL(20, 4),
			yearlycoin DECIMAL(20, 4)
			)""")	

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
	  