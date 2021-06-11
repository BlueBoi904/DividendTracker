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

    def query(self, action, data=None):
        cursor = self.connection.cursor()
        result = action(cursor, data)
        cursor.close()
        self.connection.commit()
        return result

    def create_tables(self):
        """ create tables in the PostgreSQL database"""
        commands = (
            """
                CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                task VARCHAR(100) NOT NULL,
                completed BOOLEAN NOT NULL
            )
            """,)
        try:
            cur = self.connection.cursor()
            # create table one by one
            for command in commands:
                print('here is the command' + command)
                cur.execute(command)
            # close communication with the PostgreSQL database server
            cur.close()
            # commit the changes

            self.connection.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)


class Models:
    def getAllTodos(self, cursor, data):
        try:
            cursor.execute(
                """SELECT * FROM todos""")
            result = cursor.fetchall()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def addTodos(self, cursor, data):
        try:
            print(data)
            cursor.execute(
                "INSERT INTO todos VALUES (DEFAULT,%s, %s) RETURNING *", (data['task'], data['completed'],))
            result = cursor.fetchone()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def updateTodo(self, cursor, data):
        try:
            cursor.execute("UPDATE todos SET task = %s, completed = %s WHERE id=%s RETURNING *",
                           (data['task'], data['completed'], data['id'],))
            result = cursor.fetchone()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def getSingleTodo(self, cursor, data):
        try:
            cursor.execute("SELECT * FROM todos WHERE id=%s", (data["id"],))
            result = cursor.fetchone()
            return result
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def deleteTodo(self, cursor, data):
        try:
            cursor.execute("DELETE FROM todos WHERE id=%s", (data["id"],))
            result = cursor.fetchone()
            return None
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)


newTest = Database()
models = Models()


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in todos:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


task_post_args = reqparse.RequestParser()
task_post_args.add_argument(
    "task", type=str, help="Task is required", required=True)
task_post_args.add_argument(
    "completed", type=bool, help="Completed is required", required=True)


class TodoList(Resource):
    def get(self):
        # Get all todos
        todo_arr = []
        result = newTest.query(models.getAllTodos)
        for item in result:
            todo = {"id": item[0], "task": item[1], "completed": item[2]}
            todo_arr.append(todo)
        return todo_arr

    def post(self):
        # Add a new task to the todos table
        args = task_post_args.parse_args()
        data = {"task": args["task"], "completed": args["completed"]}
        result = newTest.query(models.addTodos, data)
        todo = {"id": result[0], "task": result[1], "completed": result[2]}
        return todo, 201


class Todo(Resource):
    def get(self, todo_id):
        # Get a single todo
        data = {"id": todo_id}
        result = newTest.query(models.getSingleTodo, data)
        todo = {"id": result[0], "task": result[1], "completed": result[2]}
        return todo, 200

    def put(self, todo_id):
        # Update a todo
        args = task_post_args.parse_args()
        data = {"id": todo_id,
                "task": args["task"], "completed": args["completed"]}
        result = newTest.query(models.updateTodo, data)
        todo = {"id": result[0], "task": result[1], "completed": result[2]}
        return todo, 201

    def delete(self, todo_id):
        # Delete a todo
        data = {"id": todo_id}
        result = newTest.query(models.deleteTodo, data)
        return result, 204


api.add_resource(TodoList, '/todos')
api.add_resource(Todo, '/todos/<int:todo_id>')


if __name__ == '__main__':
    app.run(debug=True)
