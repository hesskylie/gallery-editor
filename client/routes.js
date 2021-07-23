import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { HomePage, Login, Signup, AllGalleries, UserHome } from './components';
import { me } from './dux';

const Routes = props => {
  useEffect(() => {
    props.loadUser()
  }, [])

  const { isLoggedIn } = props;

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          <Route path="/galleries" component={AllGalleries} />
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
    <Route component={Login} />
    </Switch>
  )
}

const mapState = state => {
  return { isLoggedIn: !!state.user.id }
}

const mapDispatch = dispatch => {
  return {
    loadUser() {
      dispatch(me());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));
