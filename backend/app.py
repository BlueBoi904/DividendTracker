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


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in todos:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "task", type=str, help="Task is required", required=True)


class TodoList(Resource):
    def get(self):
        return todos

    def post(self):
        args = task_post_args.parse_args()
        todo_id = int(max(todos.keys())) + 1
        todos[todo_id] = {"task": args["task"]}
        return todos[todo_id], 201


class Todo(Resource):
    def get(self, todo_id):
        return todos[todo_id]

    def put(self, todo_id):
        args = task_post_args.parse_args()
        abort_if_todo_doesnt_exist(todo_id)
        task = {"task": args["task"]}
        todos[todo_id] = task
        return task, 201

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del todos[todo_id]
        return '', 204


api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<int:todo_id>')


if __name__ == '__main__':
    app.run(debug=True)
