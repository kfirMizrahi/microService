from flask import Flask, request, jsonify
from models import db, Todo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

@app.before_request
def create_tables():
    # The following line will remove this handler, making it
    # only run on the first request
    app.before_request_funcs[None].remove(create_tables)

    db.create_all()
@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = Todo(user_id=data['user_id'], task=data['task'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.to_dict()), 201

@app.route('/todos/<int:id>', methods=['GET'])
def get_todo_by_id(id):
    todo = Todo.query.get_or_404(id)
    return jsonify(todo.to_dict())

@app.route('/todos/user/<int:user_id>', methods=['GET'])
def get_todos_by_user_id(user_id):
    todos = Todo.query.filter_by(user_id=user_id).all()
    return jsonify([todo.to_dict() for todo in todos])

if __name__ == '__main__':
    app.run(port=5002, debug=True)
