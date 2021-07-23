import React, { useState } from 'react';
import { Login, Signup } from '../components';

const HomePage = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <div>
      <p>A place to share your artwork, memories, and more.</p>
    { signUp ?
      <Signup /> : (
        <div>
      <Login />
      <p>Not yet a user?</p>
      <button type="button" onClick={() => setSignUp(true)}>Sign Up</button>
      </div>)
    }
    </div>
  )
}

export default HomePage;
