import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import { AuthContext } from '../store/auth-context';


const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();


  async function onSubmitHandler(e) {
    e.preventDefault();
    const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: authCtx.token,
        password: emailRef.current.value,
        returnSecureToken: true

      })
    })
    console.log(resp);

  }


  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' ref={emailRef} id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
