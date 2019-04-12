from content_management import Content

TOPIC_DICT = Content()

FUNC_TEMPLATE = '''

def CURRENTINDEXInfo() :	
	try:
		name = 'CURRENTINDEX'
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
		mysql.addChartCURRENTINDEX(dateAdded, mncount, roi, priceusd, pricebtc, dailycoin, monthlycoin, yearlycoin)
	except Exception:
		pass
		

'''

for each_topic in TOPIC_DICT:
    #print(each_topic)

    index_counter = 0
    for eachele in TOPIC_DICT[each_topic]:
        try:
            CURRENTTOPIC = each_topic
            CURRENTINDEX = eachele[0]
            CURRENTTITLE = eachele[1]

            print( FUNC_TEMPLATE.replace("CURRENTTOPIC",CURRENTTOPIC).replace("CURRENTINDEX",CURRENTINDEX).replace("CURRENTTITLE",CURRENTTITLE) )

        except Exception as e:
            print(str(e))	  
	  