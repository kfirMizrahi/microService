import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TODO_SERVICE_URL = 'http://127.0.0.1:5002/todos';

const TodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState('');
    const [task, setTask] = useState('');

    const fetchTodos = async (userId) => {
        const response = await axios.get(`${TODO_SERVICE_URL}/user/${userId}`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.post(TODO_SERVICE_URL, { user_id: userId, task });
        setTodos([...todos, response.data]);
        setTask('');
    };

    return (
        <div>
            <h2>Todos</h2>
            <input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => fetchTodos(userId)}>Fetch Todos</button>
            <br />
            <input
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={createTodo}>Create Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task} ({todo.completed ? "Completed" : "Pending"})</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoComponent;
