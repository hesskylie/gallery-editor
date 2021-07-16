import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Login, Signup, AllGalleries } from './components';
import { me } from './dux';

const Routes = props => {
  useEffect(() => {
    props.loadInitialData()
  }, [])

  const { isLoggedIn } = props;

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          <Route path="/galleries" component={AllGalleries} />
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
    loadInitialData() {
      dispatch(me());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));
