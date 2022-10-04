import { useRef, useState, useContext } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function saveToken(data) {
    const resp = await data.json();
    const token = resp.idToken;

    authCtx.login(token)

    console.log(authCtx.token);

  }

  async function submitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value
    const password = passwordRef.current.value
    let url;


    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g'

    }
    else {

      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g'


    }


    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'


      },
      body: JSON.stringify(
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )

    })

    if (resp.ok) {

      saveToken(resp)

    }
    else {
      const data = await resp.json()
      alert(data.error.message);

    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={emailRef} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref={passwordRef} id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
