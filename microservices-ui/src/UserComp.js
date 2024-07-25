import React, { useState, useEffect } from 'react';
import axios from 'axios';

const USER_SERVICE_URL = 'http://127.0.0.1:5001/users';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(USER_SERVICE_URL);
        setUsers(response.data);
    };

    const createUser = async () => {
        const response = await axios.post(USER_SERVICE_URL, { username, email });
        setUsers([...users, response.data]);
        setUsername('');
        setEmail('');
    };

    return (
        <div>
            <h2>Users</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={createUser}>Create User</button>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
