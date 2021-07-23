import React from 'react';
import { useSelector } from 'react-redux';
import { AllGalleries } from '../components';

const UserHome = () => {
  const { user } = useSelector(state => {
    return { user: state.user }
})
  return (
    <div>
      <p>Welcome, {user.username}</p>
      <AllGalleries />
    </div>

  )
}



export default UserHome;
