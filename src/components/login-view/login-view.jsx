import React, { useState } from 'react';
import PropTypes from "prop-types";

export function LoginView(props) {
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(name);
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
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
LoginView.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };