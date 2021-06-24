import React from 'react';
import { Login, Signup, AllGalleries } from './components'

const App = () => {

  return (
    <div>
    <h1>Gallery Editor</h1>
      <Login />
      <Signup />
    <AllGalleries />
    </div>
  )
}

export default App
