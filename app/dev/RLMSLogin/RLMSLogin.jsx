import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent';

class LoginApp extends React.Component{
  constructor(){
    super();
    this.state = {};
  }
  
  render(){
    return <LoginForm/>;
  }
}

const LoginForm = (props) =>{
  return (
    <div>
    <h1><p>Welcome to RLMS</p></h1>
    <h2>Login</h2>
    
    <form action="/api/login" method="post">
      <label>Username: </label>
      <input type="text" name="username" id="username"></input>
      <label>Password: </label>
      <input type="password" name="password" id="password"></input>
      <button type="submit">LogIn</button>
      </form>
    
    </div>
  );
}

render(<LoginApp/>, document.getElementById("temp"));

if(module.hot){
  module.hot.accept();
}