import React, { useState } from 'react';
import { login } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password)
            .then(() => {
                props.onLoginSuccess(); // Set authentication status in parent component
                navigate('/'); // Navigate to homepage
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="container">
            {/* Get similar margins to the To Do List */}
            <div className="col-md-6 col-sm-10 mt-4 mx-auto p-0">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <div className="mt-3 mb-3">
                    <button type="submit" className="btn btn-dark btn-outline-danger">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;