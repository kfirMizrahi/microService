import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css'; // Reuse the same animation styles

const TODO_SERVICE_URL = 'http://127.0.0.1:5002/todos';

const Container = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
`;

const Title = styled.h2`
    color: #343a40;
`;

const Input = styled.input`
    margin: 5px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const Button = styled.button`
    margin: 5px;
    padding: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #218838;
    }
`;

const TodoList = styled.ul`
    list-style: none;
    padding: 0;
`;

const TodoItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #dee2e6;
`;

const TodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState('');
    const [task, setTask] = useState('');

    const fetchTodos = async (userId) => {
        try {
            const response = await axios.get(`${TODO_SERVICE_URL}/user/${userId}`);
            setTodos(response.data);
        } catch (error) {
            console.error("There was an error fetching the todos!", error);
        }
    };

    const createTodo = async () => {
        try {
            const response = await axios.post(TODO_SERVICE_URL, { user_id: userId, task });
            setTodos([...todos, response.data]);
            setTask('');
        } catch (error) {
            console.error("There was an error creating the todo!", error);
        }
    };

    return (
        <Container>
            <Title>Todos</Title>
            <Input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <Button onClick={() => fetchTodos(userId)}>Fetch Todos</Button>
            <br />
            <Input
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button onClick={createTodo}>Create Todo</Button>
            <TodoList>
                <TransitionGroup>
                    {todos.map((todo) => (
                        <CSSTransition
                            key={todo.id}
                            timeout={500}
                            classNames="item"
                        >
                            <TodoItem>{todo.task} ({todo.completed ? "Completed" : "Pending"})</TodoItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </TodoList>
        </Container>
    );
};

export default TodoComponent;
