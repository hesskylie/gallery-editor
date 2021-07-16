import React, {useState} from 'react';
import { Login, Signup } from './components';
import Routes from './routes';

const App = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
    <h1>Gallery Editor</h1>
    {signUp ?
      <Signup /> :
      <div>
      <Login />
      <p>Not yet a user?</p>
      <button type="button" onClick={() => setSignUp(true)}>Sign Up</button>
      </div>
    }
    <Routes />
    </div>
  )
}

export default App
