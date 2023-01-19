import { Button } from '@mui/material'
import React from 'react';
import {actionTypes} from './reducer';
import {auth, provider} from './firebase';
import './Login.css'
import { useStateValue } from './StateProvider';
function Login() {

  const [state, dispatch] = useStateValue();
  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(result => {
        
      dispatch({
        type: actionTypes.SET_USER,
        user : result.user
      })

    })
    .catch((error) => alert(error.message));
   }
  return (
    <div className='login'>
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904" alt="" />
     <div className="login__text">
      <h1>Sign in to WhatsApp</h1>
     </div>

     <Button onClick={signIn}>
      Sign In With Google
     </Button>
      </div>
    </div>
  )
}

export default Login