from flask import *
from mysql.connector import pooling
import mysql.connector
import json
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

users = Blueprint('users',
                  __name__)
load_dotenv()
connection_pool = pooling.MySQLConnectionPool(pool_name=os.getenv('DB_NAME'),
                                              pool_size=5,
                                              pool_reset_session=True,
                                              host=os.getenv('DB_HOST'),
                                              user=os.getenv('DB_USER'),
                                              password=os.getenv(
                                                  'DB_PASSWORD'),
                                              database=os.getenv(
                                                  'DB_DATABASE'),
                                              auth_plugin="mysql_native_password",)


@ users.route('/api/user', methods=["POST"])
def register():
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']
        hashed_pwd = generate_password_hash(password).encode("UTF-8")
        if not name or not email or not password:
            return jsonify({
                "error": True,
                "message": "請重新檢查是否已填入正確資訊"
            })
        mydb = connection_pool.get_connection()
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(
            "SELECT email FROM member WHERE email=%s", (email,))
        account = mycursor.fetchone()
        if account:
            return jsonify({
                "error": True,
                "message": "此Email已經被註冊"
            })
        mycursor.execute("INSERT INTO member(name, email, password) VALUES(%s, %s, %s)",
                         (name, email, hashed_pwd))
        mydb.commit()
        mydb.close()
        session['name'] = name
        session['email'] = email
        return jsonify({
            "ok": True
        })
    except:
        return jsonify({
            'error': 'true',
            'message': 'post伺服器內部錯誤'}), 500


@ users.route('/api/user', methods=["PATCH"])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        mydb = connection_pool.get_connection()
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(
            "SELECT * FROM member WHERE email = %s", (email,))
        result = mycursor.fetchone()
        mydb.close()
        if result:
            # for i in result:
            check_pwd = result['password']
            if check_password_hash(check_pwd, password):
                session['email'] = email
                session['user'] = result['name']
                return {
                    "ok": True,
                }
            else:
                return jsonify({
                    "error": True,
                    "message": "帳號、密碼輸入錯誤"
                })
        else:
            return jsonify({
                "error": True,
                "message": "沒這個帳號"
            })

    except:
        return jsonify({
            'error': 'true',
            'message': 'patch伺服器內部錯誤'}), 500


@ users.route('/api/user', methods=["GET"])
def getUser():
    if 'email' in session:
        email = session['email']
        mydb = connection_pool.get_connection()
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(
            "SELECT * FROM member WHERE email=%s", (email,))
        result = mycursor.fetchone()
        mydb.close()
        userid = result['id']
        username = result['name']
        useremail = result['email']
        return jsonify({
            "data": {
                "id": userid,
                "name": username,
                "email": useremail
            }
        })
    else:
        return jsonify({
            "data": None
        })


@ users.route('/api/user', methods=["DELETE"])
def logout():
    session.pop('user', None)
    session.pop('email', None)
    return {
        "ok": True
    }
