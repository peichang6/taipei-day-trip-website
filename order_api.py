from flask import *
from mysql.connector import pooling
import mysql.connector
import json
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

order_sheet = Blueprint('order_sheet',
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


@ order_sheet.route('/api/booking', methods=["GET", "POST", "DELETE"])
def getOrder():
    if 'user' not in session:
        return jsonify({
            "error": True,
            "message": "未登入系統"}), 403
    if request.method == 'POST':
        try:
            data = request.get_json()
            attractionId = data['attractionId']
            date = data['date']
            time = data['time']
            price = data['price']

            if not date or not time or not price:
                return jsonify({
                    "error": True,
                    "message": "請重新檢查是否已填入正確資訊"
                }), 400
            mydb = connection_pool.get_connection()
            mycursor = mydb.cursor(dictionary=True)
            mycursor.execute(
                "SELECT name, address, images FROM attraction WHERE id = %s", (attractionId,))
            result = mycursor.fetchone()
            mydb.close()
            if time == "afternoon":
                time_period = "下午 2 點到晚上 9 點"
            else:
                time_period = "早上 9 點到下午 4 點"
            booking_data = {
                "attraction": {
                    "id": attractionId,
                    "name": result['name'],
                    "address": result['address'],
                    "image": [f"https://{url}" for url in result['images'].split("https://")[1:]][0]
                },
                "date": date,
                "time": time_period,
                "price": price
            }
            session["booking_data"] = booking_data

            return jsonify({
                "ok": True
            }), 200

        except:
            return jsonify({
                'error': 'true',
                'message': '伺服器內部錯誤'}), 500
    if request.method == 'GET':
        if 'booking_data' not in session:
            return jsonify({"data": None})
        return jsonify({"data": session["booking_data"]})

    if request.method == 'DELETE':
        session.pop('booking_data', None)
        return {
            "ok": True
        }
