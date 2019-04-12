from content_management import Content

TOPIC_DICT = Content()

FUNC_TEMPLATE = '''

        cursor.execute("""CREATE TABLE IF NOT EXISTS CURRENTINDEX (
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
            CURRENTINDEX = eachele[0]
            CURRENTTITLE = eachele[1]

            print( FUNC_TEMPLATE.replace("CURRENTTOPIC",CURRENTTOPIC).replace("CURRENTINDEX",CURRENTINDEX).replace("CURRENTTITLE",CURRENTTITLE) )

        except Exception as e:
            print(str(e))	  
	  