import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import UserProfile from '../../UserProfile';


async function loginUser(credentials) {
  const response = await fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
  })
  console.log(response)
  if (!response.ok) {
    throw response
  }
  //var data = await response.json()
  //console.log(response)
  UserProfile.setName(credentials.username)
  return {token : await response.json(), user: credentials.username}

   //.then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    try{
      e.preventDefault();
      const token = await loginUser({
        username,
        password
      });
      console.log(token);
      setToken(token);
    }
    catch(response){
      console.log('caught')
    }
    
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* <div>
          <button type="submit">Register</button>
      </div> */}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};