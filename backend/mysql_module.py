import pymysql.cursors
import config
from decimal import Decimal

MIN_CONFIRMATIONS_FOR_DEPOSIT = 2


class Mysql:
    """
    Singleton helper for complex database methods
    """
    instance = None

    def __init__(self):
        if not Mysql.instance:
            Mysql.instance = Mysql.__Mysql()

    def __getattr__(self, name):
        return getattr(self.instance, name)

    class __Mysql:
        def __init__(self):
            self.__host = config.mysql['db_host']
            self.__port = config.mysql['db_port']
            self.__db_user = config.mysql['db_user']
            self.__db_pass = config.mysql['db_pass']
            self.__db = config.mysql['db']
            self.__connected = 1
            self.__setup_connection()

        def __setup_connection(self):
            self.__connection = pymysql.connect(
                host=self.__host,
                port=self.__port,
                user=self.__db_user,
                password=self.__db_pass,
                db=self.__db)

        def __setup_cursor(self, cur_type):
            # ping the server and reset the connection if it is down
            self.__connection.ping(True)
            return self.__connection.cursor(cur_type)

# region User
# region Balance
        def updateCoinInfo(self, name, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, dailyUSD, dailyBTC, dailyCoin, weeklyUSD, weeklyBTC, weeklyCoin, monthlyUSD, monthlyBTC, monthlyCoin, yearlyUSD, yearlyBTC, yearlyCoin, coinLock, donate,  btcval, usdMarketCap, btcMarketCap, btcvol, blockcount, block24hr, avgblock, walletversion, genesisdate, status):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE coins SET roi=%s, usdvalue=%s, changep=%s, mnCost=%s, mncount=%s, mnpriceusd=%s,  usdvol=%s, dailyUSD=%s, dailyBTC=%s, dailyCoin=%s, weeklyUSD=%s,  weeklyBTC=%s, weeklyCoin=%s, monthlyUSD=%s, monthlyBTC=%s, monthlyCoin=%s,  yearlyUSD=%s, yearlyBTC=%s, yearlyCoin=%s, coinLock=%s, donate=%s,  btcval=%s, usdMarketCap=%s, btcMarketCap=%s, btcvol=%s, blockcount=%s,  block24hr=%s, avgblock=%s, walletversion=%s, genesisdate=%s, status=%s WHERE name=%s"
            cursor.execute(to_exec, (roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, dailyUSD, dailyBTC, dailyCoin, weeklyUSD, weeklyBTC, weeklyCoin, monthlyUSD, monthlyBTC, monthlyCoin, yearlyUSD, yearlyBTC, yearlyCoin, coinLock, donate,  btcval, usdMarketCap, btcMarketCap, btcvol, blockcount, block24hr, avgblock, walletversion, genesisdate, status, name))
            cursor.close()
            self.__connection.commit()
			
        def addMasternodeList(self, values_to_insert):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
				
            query = "INSERT INTO masternodeList (name, status, address, version, lastSeen, lastPaid) VALUES " + ",".join("(%s, %s, %s, %s, %s, %s)" for _ in values_to_insert)
            flattened_values = [item for sublist in values_to_insert for item in sublist]
            cursor.execute(query, flattened_values)		
			
            cursor.close()
            self.__connection.commit()
			
        def clearMasternodeList(self):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "DELETE FROM masternodeList"
            cursor.execute(to_exec)
            cursor.close()
            self.__connection.commit()	

        def updateMasterNodeUpdateTime(self, lastUpdatedMNList):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE coins SET lastUpdatedMNList=%s "
            cursor.execute(to_exec, (lastUpdatedMNList))
            cursor.close()
            self.__connection.commit()	

        def updateCoinsUpdateTime(self, name, lastUpdateCoinStats):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE coins SET lastUpdateCoinStats=%s WHERE name=%s"
            cursor.execute(to_exec, (lastUpdateCoinStats, name))
            cursor.close()
            self.__connection.commit()				
			
        def updateStatus(self, name, status):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE coins SET status=%s WHERE name=%s"
            cursor.execute(to_exec, (status, name))			
            cursor.close()
            self.__connection.commit()			

        def removeFromMaintance(self, name, status):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name FROM maintenance WHERE name LIKE %s"
            cursor.execute(to_exec, (str(name)))
            result_set = cursor.fetchone()
            if result_set is None:
                return
            else:
                pass	
            to_exec = "INSERT INTO coins SELECT * FROM maintenance WHERE name=%s"
            cursor.execute(to_exec, (name))
            to_exec = "DELETE FROM maintenance WHERE name=%s"
            cursor.execute(to_exec, (name))
            to_exec = "UPDATE coins SET status=%s WHERE name=%s"
            cursor.execute(to_exec, (status, name))			
            cursor.close()
            self.__connection.commit()				
			
        def check_for_coin(self, name, nameb, tickerCap, btt, bttb, discord, discordb, github, githubb, twitter, twitterb, website, websiteb, explorer, explorerb, exchange, exchangename, exchangeb, exchangenameb, img16, page):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name FROM coins WHERE name LIKE %s"
            cursor.execute(to_exec, (str(name)))
            result_set = cursor.fetchone()		
            cursor.close()
            
            if result_set is None:
                self.add_coin(name, nameb, tickerCap, btt, bttb, discord, discordb, github, githubb, twitter, twitterb, website, websiteb, explorer, explorerb, exchange, exchangename, exchangeb, exchangenameb, img16, page)			

        def add_coin(self, name, nameb, tickerCap, btt, bttb, discord, discordb, github, githubb, twitter, twitterb, website, websiteb, explorer, explorerb, exchange, exchangename, exchangeb, exchangenameb, img16,  page):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO coins (name, nameb, tickerCap, btt, bttb, discord, discordb, github, githubb, twitter, twitterb, website, websiteb, explorer, explorerb, exchange, exchangename, exchangeb, exchangenameb, img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, dailyUSD, dailyBTC, dailyCoin, weeklyUSD, weeklyBTC, weeklyCoin, monthlyUSD, monthlyBTC, monthlyCoin, yearlyUSD, yearlyBTC, yearlyCoin, coinLock, donate, btcval, usdMarketCap, btcMarketCap, btcvol,  blockcount, block24hr, avgblock, walletversion, genesisdate, status) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (str(name), str(nameb), str(tickerCap), str(btt), str(bttb), str(discord), str(discordb), str(github), str(githubb), str(twitter), str(twitterb), str(website), str(websiteb), str(explorer), str(explorerb), str(exchange), str(exchangename), str(exchangeb), str(exchangenameb), str(img16),  str(page), '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'status'))
            cursor.close()
            self.__connection.commit()


			
        def updateFundingInfo(self, name, progress, amountInAddress, btcNeeded):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE funding SET progress=%s, amountInAddress=%s, btcNeeded=%s WHERE name=%s"
            cursor.execute(to_exec, (progress, amountInAddress, btcNeeded, name))
            cursor.close()
            self.__connection.commit()			
			
        def check_for_funding(self, name, website, requiredBTC, address, dateAdded):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name FROM funding WHERE name LIKE %s"
            cursor.execute(to_exec, (str(name)))
            result_set = cursor.fetchone()
            
            if result_set is None:
                self.add_funding(name, website, requiredBTC, address, dateAdded)			

        def add_funding(self, name, website, requiredBTC, address, dateAdded):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO funding (name, website, progress, amountInAddress, btcNeeded, requiredBTC, address, dateAdded ) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (str(name), str(website), '0', '0', '0', str(requiredBTC), str(address), str(dateAdded)))
            cursor.close()
            self.__connection.commit()	

        def addChartCoin(self, name, date, mncount, roi, priceusd, pricebtc, dailycoin, monthlycoin, yearlycoin):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO graph (name, date, mncount, roi, priceusd, pricebtc, dailycoin, monthlycoin, yearlycoin ) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (str(name), str(date), str(mncount), str(roi), str(priceusd), str(pricebtc), str(dailycoin), str(monthlycoin), str(yearlycoin)))
            cursor.close()
            self.__connection.commit()	
			
        def check_for_market(self, exchange_slug, pair):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT * FROM markets WHERE exchange_slug LIKE %s AND pair LIKE %s"
            cursor.execute(to_exec, (str(exchange_slug), str(pair)))
            result_set = cursor.fetchone()		
            cursor.close()
            
            if result_set is None:
                return True			

        def add_market(self, exchange, exchange_slug, exchange_logo_id, currency, currency_slug, currency_logo_id, pair, USD_price, USD_volume, last_updated):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO markets (exchange, exchange_slug, exchange_logo_id, currency, currency_slug, currency_logo_id, pair, USD_price, USD_volume, last_updated) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (str(exchange), str(exchange_slug), str(exchange_logo_id), str(currency), str(currency_slug), str(currency_logo_id), str(pair), float(USD_price), float(USD_volume), int(last_updated)))
            cursor.close()
            self.__connection.commit()

        def get_name_market(self, ticker):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)           
            to_exec = "SELECT uid, name, website_slug, symbol FROM cryptocurrencies WHERE symbol LIKE %s"
            cursor.execute(to_exec, (str(ticker)))
            result_set = cursor.fetchone()
            cursor.close()
            return result_set
			
        def get_currency(self, ticker):
            result_set = self.get_name_market(ticker)
            return result_set.get("name")
			
        def get_currency_slug(self, ticker):
            result_set = self.get_name_market(ticker)
            return result_set.get("website_slug")
		
        def get_currency_logo_id(self, ticker):
            result_set = self.get_name_market(ticker)
            return result_set.get("uid")

        def updateMarketInfo(self, exchange_slug, pair, USD_price, USD_volume, last_updated):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE markets SET USD_price=%s, USD_volume=%s, last_updated=%s WHERE exchange_slug=%s AND pair=%s"
            cursor.execute(to_exec, (float(USD_price), float(USD_volume), int(last_updated), str(exchange_slug), str(pair)))
            cursor.close()
            self.__connection.commit()	

        def check_for_market_market_name(self, exchange_slug, pair):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT currency FROM markets WHERE exchange_slug LIKE %s AND pair LIKE %s"
            cursor.execute(to_exec, (str(exchange_slug), str(pair)))
            result_set = cursor.fetchone()		
            cursor.close()
            
            if result_set.get("currency") == "?":
                return True				

        def getNewBackInput(self):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name, ticker, mnCost, priceApi, priceApiLink, coinType, getBlockDataType, TxData1, TxData2, explorerTotalLink, explorerType FROM coinConfig WHERE active IS NULL"
            cursor.execute(to_exec)
            coins = cursor.fetchall()	
            cursor.close()
            return 	coins

        def getNewBackInput2(self, name):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name, ticker, mnCost, priceApi, priceApiLink, coinType, getBlockDataType, TxData1, TxData2, explorerTotalLink, explorerType FROM coinConfig WHERE active IS NULL AND name=%s"
            cursor.execute(to_exec, (name))
            coins = cursor.fetchall()	
            cursor.close()
            return 	coins


        def getMasternodeList(self):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name, ticker FROM coinConfig WHERE active IS NULL"
            cursor.execute(to_exec)
            coins = cursor.fetchall()	
            cursor.close()
            return 	coins			
			
        def getGraphNames(self):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name FROM coins WHERE active IS NULL"
            cursor.execute(to_exec)
            coins = cursor.fetchall()	
            cursor.close()
            return 	coins
			
        def updateMarketInfoCoinName(self, exchange_slug, currency, currency_slug, currency_logo_id, pair):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE markets SET currency=%s, currency_slug=%s, currency_logo_id=%s WHERE exchange_slug=%s AND pair=%s"
            cursor.execute(to_exec, (str(currency), str(currency_slug), str(currency_logo_id), str(exchange_slug), str(pair)))
            cursor.close()
            self.__connection.commit()		

#test	

        def update_check(self, name):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT name FROM cryptocurrencies WHERE name = %s"
            cursor.execute(to_exec, (name))
            result_set = cursor.fetchone()		
            cursor.close()
            
            if result_set is not None:
                return True	

        def update_for_cryptocurrency(self, name, Source_Code, reddit):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE cryptocurrencies SET Source_Code=%s, reddit=%s WHERE name=%s "
            cursor.execute(to_exec, (Source_Code, reddit, name))
            cursor.close()
            self.__connection.commit()	
			
        def update_for_cryptocurrency2(self, name, circulating_supply):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE cryptocurrencies SET circulating_supply=%s WHERE name=%s "
            cursor.execute(to_exec, (circulating_supply, name))
            cursor.close()
            self.__connection.commit()

        def update_for_cryptocurrency_marketcap(self, name, USD_market_cap):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "UPDATE cryptocurrencies SET USD_market_cap=%s WHERE name=%s "
            cursor.execute(to_exec, (USD_market_cap, name))
            cursor.close()
            self.__connection.commit()
			
        def check_for_cryptocurrency(self, name, symbol, website_slug,  max_supply, category, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Source_Code, Technical_Documentation, Tag, Tag_2, Tag_3, Tag_Status, last_updated, reddit, twitter):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT website_slug FROM cryptocurrencies WHERE website_slug LIKE %s"
            cursor.execute(to_exec, (str(website_slug)))
            result_set = cursor.fetchone()
            
            if result_set is None:
                self.add_cryptocurrency(name, symbol, website_slug,  max_supply, category, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Source_Code, Technical_Documentation, Tag, Tag_2, Tag_3, Tag_Status, last_updated, reddit, twitter)			

        def add_cryptocurrency(self, name, symbol, website_slug,  max_supply, category, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Source_Code, Technical_Documentation, Tag, Tag_2, Tag_3, Tag_Status, last_updated, reddit, twitter):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO cryptocurrencies (name, symbol, website_slug,  max_supply, category, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Source_Code, Technical_Documentation, Tag, Tag_2, Tag_3, Tag_Status, last_updated, reddit, twitter_screen_name ) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (name, symbol, website_slug,  max_supply, category, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Source_Code, Technical_Documentation, Tag, Tag_2, Tag_3, Tag_Status, last_updated, reddit, twitter))
            cursor.close()
            self.__connection.commit()	

        def check_for_cryptocurrency2(self, name, symbol, website_slug,  max_supply, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Facebook, BitcoinTalk, Telegram, twitter, last_updated):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT website_slug FROM cryptocurrencies WHERE website_slug LIKE %s"
            cursor.execute(to_exec, (str(website_slug)))
            result_set = cursor.fetchone()
            
            if result_set is None:
                self.add_cryptocurrency2(name, symbol, website_slug,  max_supply, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Facebook, BitcoinTalk, Telegram, twitter, last_updated)			

        def add_cryptocurrency2(self, name, symbol, website_slug,  max_supply, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Facebook, BitcoinTalk, Telegram, twitter, last_updated):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO cryptocurrencies (name, symbol, website_slug,  max_supply, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, facebook_username, bitcointalk_thread_identifier, telegram_channel_identifier, twitter_screen_name, last_updated ) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (name, symbol, website_slug,  max_supply, Website, Announcement, Explorer, Explorer_2, Explorer_3, Forum, Forum_2, Forum_3, Chat, Chat_2, Chat_3, Facebook, BitcoinTalk, Telegram, twitter, last_updated))
            cursor.close()
            self.__connection.commit()				

        def check_for_exchanges(self, name, website_slug, Website, Fee, Fee_Name, Blog, Blog_Name, Chat, Chat_Name, Chat_2, Chat_Name_2, Chat_3, Chat_Name_3, twitter, twitter_Name, Tag, Tag_2, Tag_Status, last_updated):
            """
            Checks for a new user and creates one if needed.
            """
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "SELECT website_slug FROM cryptocurrencies WHERE website_slug LIKE %s"
            cursor.execute(to_exec, (str(website_slug)))
            result_set = cursor.fetchone()
            
            if result_set is None:
                self.add_exchanges(name, name, website_slug, Website, Fee, Fee_Name, Blog, Blog_Name, Chat, Chat_Name, Chat_2, Chat_Name_2, Chat_3, Chat_Name_3, twitter, twitter_Name, Tag, Tag_2, Tag_Status, last_updated)			

        def add_exchanges(self, name, website_slug, Website, Fee, Fee_Name, Blog, Blog_Name, Chat, Chat_Name, Chat_2, Chat_Name_2, Chat_3, Chat_Name_3, twitter, twitter_Name, Tag, Tag_2, Tag_Status, last_updated):
            cursor = self.__setup_cursor(
                pymysql.cursors.DictCursor)
            to_exec = "INSERT INTO cryptocurrencies (name, website_slug, Website, Fee, Fee_Name, Blog, Blog_Name, Chat, Chat_Name, Chat_2, Chat_Name_2, Chat_3, Chat_Name_3, twitter, twitter_Name, Tag, Tag_2, Tag_Status, last_updated ) VALUES( %s, %s, %s, %s, %s, %s, %s,  %s, %s, %s, %s, %s, %s, %s,  %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(
                to_exec, (name, website_slug, Website, Fee, Fee_Name, Blog, Blog_Name, Chat, Chat_Name, Chat_2, Chat_Name_2, Chat_3, Chat_Name_3, twitter, twitter_Name, Tag, Tag_2, Tag_Status, last_updated))
            cursor.close()
            self.__connection.commit()			
