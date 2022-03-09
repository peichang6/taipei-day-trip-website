import json
from mysql.connector import pooling


connection_pool = pooling.MySQLConnectionPool(pool_name="mysql_pool",
                                              pool_size=5,
                                              pool_reset_session=True,
                                              host="localhost",
                                              user="root",
                                              password="123456",
                                              database="website")
mydb = connection_pool.get_connection()
mycursor = mydb.cursor()

url = "taipei-attractions.json"
with open(url, 'r', encoding='UTF-8') as file:
    data = json.load(file)
    attraction_list = data["result"]["results"]
    for d in attraction_list:
        name = d['stitle']
        category = d['CAT2']
        description = d['xbody']
        address = d['address']
        transport = d['info']
        mrt = d['MRT']
        latitude = d['latitude']
        longitude = d['longitude']
        image_list = []
        for i in d['file'].split('https://'):
            if i.lower().endswith('jpg') or i.lower().endswith('png'):
                image_list.append('https://' + i)
        image = ''.join(image_list)
        # print(image)

        mycursor.execute(
            "INSERT INTO attraction(name, category, description, address, transport, mrt, latitude, longitude, images) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (name, category, description, address, transport, mrt, latitude, longitude, image))
    mydb.commit()
    mydb.close()
