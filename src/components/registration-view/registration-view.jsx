import React, { useState } from 'react';

export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [born, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, password, email, born);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(name) */
        props.onRegistration(name);
    };

    return (
        <form>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            
            <label>
                Born:
                <input type="birthday" value={born} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    );
}
