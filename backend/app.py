from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

stocks = {}


class Home(Resource):
    def get(self):
        return stocks


class Stocks(Resource):
    def get(self):
        return stocks


class Stock(Resource):
    def get(self, stock):
        return stocks[stock]

    def put(self, stock):
        stock_data = json.loads(request.data)
        stocks[stock] = stock_data


api.add_resource(Home, '/')
api.add_resource(Stocks, '/stocks')
api.add_resource(Stock, '/stock/<string:stock>')


if __name__ == '__main__':
    app.run(debug=True)
