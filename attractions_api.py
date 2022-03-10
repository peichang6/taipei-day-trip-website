from flask import Blueprint, jsonify, request
from mysql.connector import pooling
import mysql.connector
import json
import os
from dotenv import load_dotenv

attractions = Blueprint('attractions',
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
                                                  'DB_DATABASE'),)
mydb = connection_pool.get_connection()
mycursor = mydb.cursor(dictionary=True)


@ attractions.route('/api/attractions')
def getdata():
    page = int(request.args.get("page", 0))
    keyword = request.args.get("keyword", "")
    start = page*12
    mycursor.execute(
        "SELECT * FROM attraction where description LIKE %s LIMIT %s,%s", (('%'+keyword+'%'), start, 12))
    myresult = mycursor.fetchall()
    try:
        if myresult:
            if len(myresult)/12 == 1:
                nextPage = page+1
            else:
                nextPage = None
            data = []
            for information in myresult:
                data.append({
                    "id": information['id'],
                    "name": information['name'],
                    "category": information['category'],
                    "description": information['description'],
                    "address": information['address'],
                    "transport": information['transport'],
                    "mrt": information['mrt'],
                    "latitude": information['latitude'],
                    "longitude": information['longitude'],
                    "images": [f"https://{url}" for url in information['images'].split("https://")[1:]]
                })

            return jsonify({
                "nextPage": nextPage,
                "data": data}), 200
    except 500:
        return jsonify({
            "error": 'true',
            "message": '伺服器內部錯誤'}), 500


@ attractions.route('/api/attraction/<int:attractionId>')
def getbyId(attractionId):
    mycursor.execute("SELECT COUNT(id) FROM attraction")
    result = mycursor.fetchone()
    total_id = int(result['COUNT(id)'])
    try:
        if attractionId > total_id:
            return jsonify({
                "error": True,
                "message": "景點編號不正確"}), 400
        else:
            mycursor.execute(
                "SELECT * FROM attraction where id = %s", (attractionId,))
            res = mycursor.fetchall()
            for information in res:
                data = {
                    "id": information['id'],
                    "name": information['name'],
                    "category": information['category'],
                    "description": information['description'],
                    "address": information['address'],
                    "transport": information['transport'],
                    "mrt": information['mrt'],
                    "latitude": information['latitude'],
                    "longitude": information['longitude'],
                    "images": [f"https://{url}" for url in information['images'].split("https://")[1:]]
                }
                return jsonify({'data': data})
    except 500:
        return jsonify({
            'error': true,
            'message': '伺服器內部錯誤'}), 500
