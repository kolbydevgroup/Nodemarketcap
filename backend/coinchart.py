from rpc2 import *
import mysql_module 
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import config
import json
from datetime import date
import requests
import time
from parse import connection
mysql = mysql_module.Mysql()
dateAdded = time.strftime('%Y-%m-%d',time.localtime())
blackList=["\'","(",")"]


def graphInfo(Cname) :	
	try:
		name = Cname
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
		print(name)
		print(dateAdded)
		print(str(mncount))
		print(str(roi))
		print(str(priceusd))
		print(str(pricebtc))
		print(str(dailycoin))
		print(str(monthlycoin))
		print(str(yearlycoin))			
		c.close()
		con.close()		
		mysql.addChartCoin(name, dateAdded, mncount, roi, priceusd, pricebtc, dailycoin, monthlycoin, yearlycoin)
	except Exception:
		pass
		