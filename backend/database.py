import pymysql.cursors
import warnings
import config

host = config.mysql["db_host"]
try:
    port = config.mysql['db_port']
except KeyError:
    port = 3306
db_user = config.mysql['db_user']
db_pass = config.mysql['db_pass']
db = config.mysql['db']
connection = pymysql.connect(
    host=host,
    port=port,
    user=db_user,
    password=db_pass,
    db=db)
cursor = connection.cursor(pymysql.cursors.DictCursor)

#cursor.execute("DROP DATABASE IF EXISTS {};".format(database))
#cursor.execute("CREATE DATABASE IF NOT EXISTS {};".format(database))
#conn.commit()

#cursor.execute("USE {};".format(database))


def run():
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')

		
        cursor.execute("""CREATE TABLE IF NOT EXISTS coins (
            name VARCHAR(60) NOT NULL,
			nameb VARCHAR(60) NOT NULL,
			tickerCap VARCHAR(60) NOT NULL,
			btt VARCHAR(160) NOT NULL,
			bttb VARCHAR(160) NOT NULL,
			discord VARCHAR(160) NOT NULL,
			discordb VARCHAR(160) NOT NULL,
			github VARCHAR(160) NOT NULL,
			githubb VARCHAR(160) NOT NULL,
			twitter VARCHAR(160) NOT NULL,
			twitterb VARCHAR(160) NOT NULL,
			website VARCHAR(160) NOT NULL,
			websiteb VARCHAR(160) NOT NULL,
			explorer VARCHAR(160) NOT NULL,
			explorerb VARCHAR(160) NOT NULL,			
			exchange VARCHAR(160) NOT NULL,
			exchangename VARCHAR(160) NOT NULL,			
			exchangeb VARCHAR(160) NOT NULL,
			exchangenameb VARCHAR(160) NOT NULL,					
			img16 TEXT(60) NOT NULL,
            page TEXT(60) NOT NULL,
            roi DECIMAL(8, 2) NOT NULL,
            usdvalue DECIMAL(20, 6) NOT NULL,
            changep DECIMAL(6, 2) NOT NULL,
            mnCost BIGINT UNSIGNED NOT NULL,
            mncount BIGINT UNSIGNED  NOT NULL,			
            mnpriceusd DECIMAL(20, 2) NOT NULL,
            usdvol DECIMAL(30, 2) NOT NULL,
            dailyUSD DECIMAL(20, 4) NOT NULL,
            dailyBTC DECIMAL(20, 8) NOT NULL,
            dailyCoin DECIMAL(20, 4) NOT NULL,
            weeklyUSD DECIMAL(20, 4) NOT NULL,
            weeklyBTC DECIMAL(20, 8) NOT NULL,
            weeklyCoin DECIMAL(20, 4) NOT NULL,			
            monthlyUSD DECIMAL(20, 4) NOT NULL,
            monthlyBTC DECIMAL(20, 8) NOT NULL,
            monthlyCoin DECIMAL(20, 4) NOT NULL,
            yearlyUSD DECIMAL(20, 4) NOT NULL,
            yearlyBTC DECIMAL(20, 8) NOT NULL,
            yearlyCoin DECIMAL(20, 4) NOT NULL,
            coinLock BIGINT UNSIGNED  NOT NULL,			
            donate DECIMAL(20, 8) NOT NULL,
            btcval DECIMAL(20, 8) NOT NULL,	
            usdMarketCap DECIMAL(20, 2) NOT NULL,	
            btcMarketCap DECIMAL(20, 2) NOT NULL,	
            btcvol DECIMAL(20, 8) NOT NULL,
            blockcount BIGINT UNSIGNED NOT NULL,	
            block24hr BIGINT UNSIGNED NOT NULL,	
            avgblock DECIMAL(20, 2) NOT NULL,	
            walletversion VARCHAR(60) NOT NULL,			
            genesisdate VARCHAR(60)  NOT NULL,
			status VARCHAR(60)  NOT NULL,
            PRIMARY KEY (name)
            )""")

        cursor.execute("""CREATE TABLE IF NOT EXISTS funding (
            name VARCHAR(60) NOT NULL,
			website VARCHAR(160) NOT NULL,
			progress DECIMAL(6, 2) NOT NULL,
			amountInAddress DECIMAL(20, 4) NOT NULL,
			btcNeeded DECIMAL(20, 4) NOT NULL,
			requiredBTC DECIMAL(20, 4) NOT NULL,
			address VARCHAR(160) NOT NULL,
			dateAdded VARCHAR(160) NOT NULL,
            PRIMARY KEY (name)
            )""")	

        cursor.execute("""CREATE TABLE IF NOT EXISTS graph (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(60),
			date VARCHAR(60),
			mncount BIGINT UNSIGNED,
			roi DECIMAL(6, 2),
			priceusd DECIMAL(20, 3),
			pricebtc DECIMAL(20, 8),
			dailycoin DECIMAL(20, 4),
			monthlycoin DECIMAL(20, 4),
			yearlycoin DECIMAL(20, 4)
			)""")	
	
        cursor.execute("""CREATE TABLE IF NOT EXISTS cryptocurrencies (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(60),
			symbol VARCHAR(60),
			website_slug VARCHAR(60),
			category VARCHAR(60),
			rank VARCHAR(60),
			rank_Img VARCHAR(60),
			logo_id VARCHAR(60),
			circulating_supply DECIMAL(20, 8),
			total_supply DECIMAL(20, 8),
			max_supply INT,
			USD_price DECIMAL(20, 8),
			USD_market_cap DECIMAL(20, 8),
			USD_volume_24h DECIMAL(20, 8),
			USD_percent_change_1h DECIMAL(20, 8),
			USD_percent_change_24h DECIMAL(20, 8),
			USD_percent_change_7d DECIMAL(20, 8),
			BTC_price DECIMAL(20, 8),
			BTC_market_cap DECIMAL(20, 8),
			BTC_volume_24h DECIMAL(20, 8),
			BTC_percent_change_1h DECIMAL(20, 8),
			BTC_percent_change_24h DECIMAL(20, 8),
			BTC_percent_change_7d DECIMAL(20, 8),
			Website VARCHAR(200),
			Website_Name VARCHAR(60),
			Website_Img VARCHAR(60),
			Announcement VARCHAR(200),
			Announcement_Name VARCHAR(60),
			Announcement_Img VARCHAR(60),
			Explorer VARCHAR(200),
			Explorer_Name VARCHAR(60),
			Explorer_2 VARCHAR(200),
			Explorer_Name_2 VARCHAR(60),
			Explorer_3 VARCHAR(200),
			Explorer_Name_3 VARCHAR(60),
			Explorer_Img VARCHAR(60),
			Forum VARCHAR(200),
			Forum_Name VARCHAR(60),
			Forum_2 VARCHAR(200),
			Forum_Name_2 VARCHAR(60),
			Forum_3 VARCHAR(200),
			Forum_Name_3 VARCHAR(60),
			Forum_Img VARCHAR(60),
			Chat VARCHAR(200),
			Chat_Name VARCHAR(60),
			Chat_2 VARCHAR(200),
			Chat_Name_2 VARCHAR(60),
			Chat_3 VARCHAR(200),
			Chat_Name_3 VARCHAR(60),
			Chat_Img VARCHAR(60),
			Source_Code VARCHAR(200),
			Source_Code_Name VARCHAR(60),
			Source_Img VARCHAR(60),
			Technical_Documentation VARCHAR(200),
			Technical_Documentation_Name VARCHAR(60),
			Technical_Documentation_Img VARCHAR(60),
			reddit VARCHAR(200),
			reddit_Name VARCHAR(60),
			reddit_Img VARCHAR(60),
			twitter VARCHAR(200),
			twitter_Name VARCHAR(60),
			twitter_Img VARCHAR(60),
			Tag VARCHAR(60),
			Tag_2 VARCHAR(60),
			Tag_3 VARCHAR(60),
			Tag_Status VARCHAR(60),
			last_updated INT
			)""")
			
        cursor.execute("""CREATE TABLE IF NOT EXISTS exchanges (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(60),
			website_slug VARCHAR(60),
			rank VARCHAR(60),
			rank_Img VARCHAR(60),
			USD_volume_24h DECIMAL(20, 8),
			BTC_volume_24h DECIMAL(20, 8),
			Website VARCHAR(200),
			Website_Img VARCHAR(60),
			Fee VARCHAR(200),
			Fee_Name VARCHAR(60),
			Fee_Img VARCHAR(60),
			Blog VARCHAR(200),
			Blog_Name VARCHAR(60),
			Blog_Img VARCHAR(60),
			Chat VARCHAR(200),
			Chat_Name VARCHAR(60),
			Chat_2 VARCHAR(200),
			Chat_Name_2 VARCHAR(60),
			Chat_3 VARCHAR(200),
			Chat_Name_3 VARCHAR(60),
			Chat_Img VARCHAR(60),
			twitter VARCHAR(200),
			twitter_Name VARCHAR(60),
			twitter_Img VARCHAR(60),
			Tag VARCHAR(60),
			Tag_2 VARCHAR(60),
			Tag_Status VARCHAR(60),
			last_updated INT
			)""")
			
        cursor.execute("""CREATE TABLE IF NOT EXISTS markets (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			exchange VARCHAR(60),
			exchange_slug VARCHAR(60),
			exchange_logo_id VARCHAR(60),
			currency VARCHAR(60),
			currency_slug VARCHAR(60),
			currency_logo_id VARCHAR(60),
			pair VARCHAR(60),
			USD_price DECIMAL(20, 8),
			USD_volume DECIMAL(20, 8),
			last_updated INT
			)""")

        cursor.execute("""CREATE TABLE IF NOT EXISTS cryptograph (
			uid INT(11) AUTO_INCREMENT PRIMARY KEY, 
			website_slug VARCHAR(60),
			date VARCHAR(60),
			USD_price DECIMAL(20, 8),
			USD_market_cap DECIMAL(20, 8),
			USD_volume_24h DECIMAL(20, 8),
			BTC_price DECIMAL(20, 8)
			)""")	
