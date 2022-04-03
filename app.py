from flask import *
from mysql.connector import pooling
import mysql.connector
from attractions_api import attractions
from users_api import users

app = Flask(__name__, static_folder="public", static_url_path="/")

app.register_blueprint(attractions)
app.register_blueprint(users)

app.secret_key = "the key"
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['JSON_SORT_KEYS'] = False


@ app.route("/")
def index():
    return render_template("index.html")


@ app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


@ app.route("/booking")
def booking():
    return render_template("booking.html")


@ app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
