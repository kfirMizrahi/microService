import requests

# User Service URL
USER_SERVICE_URL = 'http://127.0.0.1:5001/users'
# Todo Service URL
TODO_SERVICE_URL = 'http://127.0.0.1:5002/todos'

# Function to create a user
def create_user(username, email):
    payload = {'username': username, 'email': email}
    response = requests.post(USER_SERVICE_URL, json=payload)
    return response.json()

# Function to get a user by ID
def get_user(user_id):
    response = requests.get(f"{USER_SERVICE_URL}/{user_id}")
    return response.json()

# Function to create a todo
def create_todo(user_id, task):
    payload = {'user_id': user_id, 'task': task}
    response = requests.post(TODO_SERVICE_URL, json=payload)
    return response.json()

# Function to get todos by user ID
def get_todos_by_user_id(user_id):
    response = requests.get(f"{TODO_SERVICE_URL}/user/{user_id}")
    return response.json()

# Example usage
if __name__ == "__main__":
    # Create a new user
    user = create_user("john_doe", "john@example.com")
    print("Created User:", user)

    # Get user by ID
    user = get_user(user['id'])
    print("Fetched User:", user)

    # Create a new todo for the user
    todo = create_todo(user['id'], "Buy groceries")
    print("Created Todo:", todo)

    # Get todos for the user
    todos = get_todos_by_user_id(user['id'])
    print("Todos for User:", todos)
