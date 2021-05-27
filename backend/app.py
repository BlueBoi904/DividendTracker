from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse, abort
from flask_cors import CORS, cross_origin
import json
import psycopg2

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


class Database:
    def __init__(self):
        self.connection = self.connect()
        self.create_tables()

    def connect(self):
        """ Connect to the PostgreSQL database server """
        conn = None
        try:
            # read connection parameters

            # connect to the PostgreSQL server
            print('Connecting to the PostgreSQL database...')
            conn = psycopg2.connect(
                host="localhost",
                database="postgres",
                user="postgres",
                password="todospass")

            # create a cursor select and execute query to see if db is connected
            cur = conn.cursor()

            # execute a statement
            # print('PostgreSQL database version:')
            # cur.execute('SELECT version()')

            # display the PostgreSQL database server version
            # db_version = cur.fetchone()
            # print(db_version)

            # close the communication with the PostgreSQL
            cur.close()
            return conn
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        # finally:
        #     if conn is not None:
        #         conn.close()
        #         print('Database connection closed.')

    def query(self, action):
        cursor = self.connection.cursor()
        result = action(cursor)
        cursor.close()
        self.connection.commit()
        return result

    def create_tables(self):
        """ create tables in the PostgreSQL database"""
        commands = (
            """
                CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                task VARCHAR(100) NOT NULL
            )
            """,)
        try:
            cur = self.connection.cursor()
            # create table one by one
            # for command in commands:
            #     print('here is the command' + command)
            #     cur.execute(command)
            # close communication with the PostgreSQL database server
            cur.close()
            # commit the changes

            self.connection.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)


def queryFunction(cursor):
    try:
        cursor.execute(
            """INSERT INTO todos (task) VALUES ('Create database') returning *""")
        result = cursor.fetchOne()
        print(result)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    result = cursor.fetchone()
    print(result)
    return None


newTest = Database()
newTest.query(queryFunction)


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in todos:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "task", type=str, help="Task is required", required=True)


def getAllTodos(cursor):
    try:
        cursor.execute(
            """SELECT * FROM todos""")
        result = cursor.fetchall()
        return result
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


class TodoList(Resource):
    def get(self):
        result = newTest.query(getAllTodos)
        print(result)
        return result

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
