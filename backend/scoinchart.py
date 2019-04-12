from coinchart import *
import database
import asyncio
import mysql_module 
mysql = mysql_module.Mysql()


try:
    coinNames = mysql.getGraphNames()
    for Cname in coinNames:
        graphInfo(Cname['name'])
except Exception:
    pass
