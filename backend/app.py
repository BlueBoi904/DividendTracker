from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

todos = [
    {
        "id": 1,
        "title": "Do 100 Javascript Projects",
    },
    {
        "id": 2,
        "title": "Learn NodeJS",
    }
]


class Home(Resource):
    def get(self):
        return todos


api.add_resource(Home, '/')


if __name__ == '__main__':
    app.run(debug=True)
