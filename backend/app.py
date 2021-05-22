from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse, abort
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

todos = {
    1: {
        "task": "Create a todo app"
    },
    2: {
        "task": "Create server"
    }
}

task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "task", type=str, help="Task is required", required=True)


class TodoList(Resource):
    def get(self):
        return todos


class Todo(Resource):
    def get(self, todo_id):
        return todos[todo_id]

    def post(self, todo_id):
        args = task_post_args.parse_args()
        if todo_id in todos:
            abort(409, "Task Id already in use.")
        task = {"task": args["task"]}
        todos[todo_id] = task
        return task, 201


api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<int:todo_id>')


if __name__ == '__main__':
    app.run(debug=True)
