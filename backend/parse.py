import pymysql.cursors

# mysql --user=root -p
def connection():
    con = pymysql.connect(host="127.0.0.1", port=3306, user="", password="", db="")
    return con