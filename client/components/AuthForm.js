import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../dux';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <label htmlFor="email">Email</label>
        <input required name="email" type="text" />
        <label htmlFor="password">Password</label>
        <input required name="password" type="password" />
        {displayName === 'Sign Up' ? (
          <div>
            <label htmlFor="username">Name</label>
            <input required name="username" type="text" />
          </div>
        ) : null}

        <button type="submit">{displayName}</button>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  )
}

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
 })

 const mapSignup = state => ({
   name: 'signup',
   displayName: 'Sign Up',
   error: state.user.error
 })

 const mapDispatch = dispatch => ({
   handleSubmit(evt) {
     evt.preventDefault();
     const formName = evt.target.name;
     const email = evt.target.email.value;
     const password = evt.target.password.value;
     let username;
     if (formName === 'signup') {
       username = evt.target.username.value;
     }
     dispatch(auth(email, password, username, formName))
   }
 });

 export const Login = connect(mapLogin, mapDispatch)(AuthForm);
 export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
