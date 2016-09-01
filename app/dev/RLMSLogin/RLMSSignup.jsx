import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';

class SignUpApp extends React.Component{
  constructor(){
    super();
    this.state = {};
  }
  
  render(){
    return <RegisterForm/>;
  }
  
}

const RegisterForm = (props) =>{
  return (
    <div>
    <h1><p>Join RLMS!</p></h1>
    <h2>Sign Up</h2>
    
    <form action="/api/signup" method="post">
      <label>First Name: </label>
      <input type="text" name="firstname" id="firstname"></input>
      <label>Last Name: </label>
      <input type="password" name="lastname" id="lastname"></input>
      <label>Username: </label>
      <input type="text" name="username" id="username"></input>
      <label>Password: </label>
      <input type="password" name="password" id="password"></input>
      <label>Confirm Password:</label>
      <input type="password" name="cPass" id="cPass"></input>
      <button type="submit">Register</button>
    </form>
    
    </div>
  )
}

render(<SignUpApp/>, document.getElementById(""));

if(module.hot){
  module.hot.accept();
}