import axios from 'axios';
//import history from '../history'


const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

const defaultUser = {};

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(getUser(data || defaultUser));
  } catch {
    console.error(err);
  }
}

export const editUser = (id, user) => async () => {
  try {
    await axios.put(`/api/users/${id}`, user);
  } catch (err) {
    console.log('Something went wrong in editUser. Err is: ', err);
  }
}

export const auth = (email, password, name, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password, name });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
        //history.push('/home);
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    //history.push('/login');
  } catch (err) {
    console.error(err);
  }
}


export default (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
