import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css'; // Create this file for animation styles

const USER_SERVICE_URL = 'http://127.0.0.1:5001/users';

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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const UserList = styled.ul`
    list-style: none;
    padding: 0;
`;

const UserItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #dee2e6;
`;

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(USER_SERVICE_URL);
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post(USER_SERVICE_URL, { username, email });
            setUsers([...users, response.data]);
            setUsername('');
            setEmail('');
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    };

    return (
        <Container>
            <Title>Users</Title>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={createUser}>Create User</Button>
            <UserList>
                <TransitionGroup>
                    {users.map((user) => (
                        <CSSTransition
                            key={user.id}
                            timeout={500}
                            classNames="item"
                        >
                            <UserItem>{user.username} ({user.email})</UserItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </UserList>
        </Container>
    );
};

export default UserComponent;
