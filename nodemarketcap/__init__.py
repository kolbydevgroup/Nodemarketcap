from flask import Flask, render_template, flash, request, jsonify, make_response, send_file, Blueprint, render_template, abort, redirect, url_for
import pymysql.cursors
from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy
from nodemarketcap.parse import connection
import json
import collections
import decimal
import datetime
from datetime import datetime,timedelta
from time import mktime
import os
import time
from jinja2 import TemplateNotFound

app = Flask(__name__)


mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = ''
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = ''
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'

mysql.init_app(app)



app.config['SQLALCHEMY_DATABASE_URI'] = ''

db = SQLAlchemy(app)
from nodemarketcap.modules.marketCap.FlaskApp import tables
app.register_blueprint(tables)
class DecimalEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, decimal.Decimal):
			return '{0:f}'.format(obj)
		# Let the base class default method raise the TypeError
		return json.JSONEncoder.default(self, obj)

def DecimalEncoder3(obj):
	dinfo = []
	for i in obj:			
		if isinstance(obj, decimal.Decimal):
			info.append('{0:f}'.format(obj))
		else:
			dinfo.append(obj)
		# Let the base class default method raise the TypeError
	return dinfo

app.json_encoder = DecimalEncoder



@app.route('/')
def homepage():
		con = connection()
		c = con.cursor() 
		to_exec = "SELECT img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, status, nameb FROM coins WHERE active IS NULL"
		c.execute(to_exec, ())	
		coins = c.fetchall()
		# Convert query to objects of key-value pairs		
		c.close()
		con.close() 
		return render_template("main.html", coins=coins)

@app.route('/trending/')
def trendingpage():
		con = connection()
		c = con.cursor() 
		to_exec = "SELECT img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, status, nameb, CAST(@row_number:=@row_number+1 AS SIGNED) AS row_number FROM coins, (SELECT @row_number:=0) AS t WHERE active IS NULL ORDER BY changep DESC LIMIT 20"
		c.execute(to_exec, ())	
		coins = c.fetchall()
		to_exec = "SELECT img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, usdvol, status, nameb, CAST(@row_number:=@row_number+1 AS SIGNED) AS row_number FROM coins, (SELECT @row_number:=0) AS t WHERE active IS NULL ORDER BY changep ASC LIMIT 20"
		c.execute(to_exec, ())	
		coins2 = c.fetchall()
		# Convert query to objects of key-value pairs		
		c.close()
		con.close() 
		return render_template("trending.html", coins=coins, coins2=coins2 )
	
@app.route('/widget/widget.js')
def widgetpage():
	return render_template("widget.js")	
	
@app.route('/api/')
def apipage():
	return render_template("api.html")
@app.route('/press-kit/')
def pressKit():
	return render_template("press-kit.html")

@app.route('/terms/')
def termpage():
	return render_template("terms.html")

@app.route('/privacy/')
def privacypage():
	return render_template("privacy.html")

@app.route('/disclaimer/')
def disclaimerpage():
	return render_template("disclaimer.html")

@app.route('/donate/')
def donatepage():
	return render_template("donate.html")
	
	
@app.route('/faq/')
def faqpage():
	return render_template("faq.html")
	
@app.route("/public_api'")
def get_server_pubapi():
	
	c = mysql.connect().cursor()
	c.execute('''SELECT img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, yearlyUSD, usdvol FROM coins''')
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(dict(zip(row_headers,result)))
	return json.dumps({ 'data' :json_data}, cls=DecimalEncoder, indent=4)	

@app.route("/retrieve_server_funding'")
def get_server_funding():
	
	c = mysql.connect().cursor()
	c.execute('''SELECT name, website, progress, amountInAddress, btcNeeded, requiredBTC, address, dateAdded FROM funding''')
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(result)
	return json.dumps({ 'data' :json_data}, cls=DecimalEncoder)	
	
@app.route("/retrieve_server_maintenance'")
def get_server_maintenance():
	
	c = mysql.connect().cursor()
	c.execute('''SELECT img16, page, roi, usdvalue, changep, mnCost, mncount, mnpriceusd, yearlyUSD, usdvol FROM maintenance''')
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(result)
	return json.dumps({ 'data' :json_data}, cls=DecimalEncoder)
	
	
	
'''	
@app.route('/coin/<name>/')
def convertercoins(name):
	try:

		con = connection()
		c = con.cursor()
		to_exec = "SELECT * from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		cinfo = c.fetchone()
		c.close()
		con.close()
		return render_template("convertercoins.html", cinfo=cinfo)
	except Exception as e:
		return(str(e)) 	
'''		 

@app.route("/robots.txt")
def robots_txt():
    return render_template("robots.txt")		
	
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


@app.route('/coin/<name>/')
def coininfo(name):
	try:
		con = connection()
		c = con.cursor()
		to_exec = "SELECT * from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		cinfo = c.fetchone()
		to_exec = "SELECT tickerCap from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		legend, = c.fetchone()
		to_exec = "SELECT date from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		# data, = c.fetchone()
		rows = c.fetchall()
		labels = list()
		i = 0
		for row in rows:
			labels.append(row[i])        
		to_exec = "SELECT mncount from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		rows = c.fetchall()
		# Convert query to objects of key-value pairs
		mncount = list()
		i = 0
		for row in rows:
			mncount.append(row[i])
		to_exec = "SELECT roi from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		# data = c.fetchone()
		rows = c.fetchall()
		roi = list()
		i = 0
		for row in rows:
			roi.append(row[i])        
		to_exec = "SELECT priceusd from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		rows = c.fetchall()
		# Convert query to objects of key-value pairs
		priceusd = list()
		i = 0
		for row in rows:
			priceusd.append(row[i])
		to_exec = "SELECT pricebtc from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		# data = c.fetchone()
		rows = c.fetchall()
		pricebtc = list()
		i = 0
		for row in rows:
			pricebtc.append(row[i])
		to_exec = "SELECT dailycoin from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		rows = c.fetchall()
		# Convert query to objects of key-value pairs
		dailycoin = list()
		i = 0
		for row in rows:
			dailycoin.append(row[i])
		to_exec = "SELECT monthlycoin from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		# data = c.fetchone()
		rows = c.fetchall()
		monthlycoin = list()
		i = 0
		for row in rows:
			monthlycoin.append(row[i])       
		to_exec = "SELECT yearlycoin from graph WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		rows = c.fetchall()
		# Convert query to objects of key-value pairs
		yearlycoin = list()
		i = 0
		for row in rows:
			yearlycoin.append(row[i])				
		c.close()
		con.close() 
		return render_template("convertercoins.html", cinfo=cinfo, mncount=mncount, roi=roi, priceusd=priceusd, pricebtc=pricebtc, dailycoin=dailycoin, monthlycoin=monthlycoin, yearlycoin=yearlycoin, labels = labels, legend=legend)
	except Exception as e:
		return(str(e))

@app.route('/coin/<name>/masternodeList')
def mnListInfo(name):
	try:
		con = connection()
		c = con.cursor()
		to_exec = "SELECT name, nameb, bttb, websiteb, discordb, githubb, twitterb, lastUpdatedMNList from coins WHERE name=%s"
		c.execute(to_exec, (str(name)))		
		cinfo = c.fetchone()	
		to_exec = "SELECT status, address, version, lastSeen, lastPaid FROM masternodeList WHERE name=%s"
		c.execute(to_exec, (str(name)))	
		coins = c.fetchall()		
		c.close()
		con.close() 
		return render_template("convertercoinsMnList.html", cinfo=cinfo, coins=coins)
	except Exception as e:
		return(str(e))
		
@app.route("/api/<name>")
def coinphoreapi(name):
	c = mysql.connect().cursor()
	to_exec = "SELECT name, nameb, tickerCap, roi, usdvalue, changep, mnCost, yearlyUSD, yearlyBTC, monthlyUSD, monthlyBTC, dailyBTC, usdvol, dailyUSD, btcvol, btcval, usdMarketCap, btcMarketCap, mnpriceusd, mncount from coins WHERE name=%s"
	c.execute(to_exec, (str(name)))	
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(dict(zip(row_headers,result)))
	return jsonify(json_data), 200
		

@app.route("/api/apiphore/phore")
def coinphoreapiyom():
	name = "phore"
	c = mysql.connect().cursor()
	to_exec = "SELECT name, blockcount,	mncount from coins WHERE name=%s"
	c.execute(to_exec, (str(name)))	
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(dict(zip(row_headers,result)))
	return jsonify(json_data), 200

@app.route("/api/api")
def coinapiapi():
	name = 'curium'
	c = mysql.connect().cursor()
	to_exec = "SELECT name from coins"
	c.execute(to_exec)	
	row_headers=[x[0] for x in c.description] #this will extract row headers
	rv = c.fetchall()
	json_data=[]
	for result in rv:
		json_data.append(dict(zip(row_headers,result)))
	return json.dumps(json_data, cls=DecimalEncoder, indent=4)			

@app.route("/api/getlogo/<name>")
def coinLogophoreapi(name):
	try:
		return send_file('/var/www/nodemarketcap/nodemarketcap/static/imgs/coinsapi/'+name+'.png', attachment_filename='python.png')
	except Exception as e:
		return str(e)
		

	
if __name__ == "__main__":
    app.run()

