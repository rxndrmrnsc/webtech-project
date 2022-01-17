import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import UserProfile from '../../UserProfile';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

        <TextField id="outlined-basic"
          className="textField"
          label="Username" 
          variant="outlined" 
          sx={{margin:'5px', borderRadius:'5px', backgroundColor:'#EDF5E1'}}
          onChange={e => setUserName(e.target.value)}
        />
        
        <TextField id="outlined-password-input"
          className="textField" 
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          sx={{margin:'5px', borderRadius:'5px', backgroundColor:'#EDF5E1'}}
          onChange={e => setPassword(e.target.value)} 
        />

        <TextField id="outlined-password-input"
          className="textField" 
          label="Repeat Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          sx={{margin:'5px', borderRadius:'5px', backgroundColor:'#EDF5E1'}}
          onChange={e => setPassword2(e.target.value)} 
        />

        <div>
          <Button
          variant="contained"
          className="submitBtn" 
          type="submit"
          style={{color:'#EDF5E1', fontFamily: "'Poppins', sans-serif", backgroundColor:'#05386B'}}
          sx={{margin:'5px', outline: 'none'}}>Submit</Button>
        </div>
      </form>
    </div>
  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};