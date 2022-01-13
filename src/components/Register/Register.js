import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import UserProfile from '../../UserProfile';

async function registerUser(credentials) {
  const response = await fetch('http://localhost:8080/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
  })
  if (!response.ok) {
    throw response
  }
  //var data = await response.json()
  //console.log(response)
  UserProfile.setName(credentials.username)
  return {token : await response.json(), user: credentials.username}

   //.then(data => data.json())
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    if(password === password2){
        try{
            const token = await registerUser({
                username,
                password
            });
            console.log(token);
            setToken(token);
        } catch(response){
            console.log('caught - user exists')
        }
        
    }
  }

  return(
    <div className="register-wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Password again</p>
          <input type="password" onChange={e => setPassword2(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};