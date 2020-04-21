import React from 'react';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../graphql/queries';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ 
  component: Component, 
  path,
  exact,
  ...rest 
}) => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/user" />
      )}
    />
  )
}

export const ProtectedRoute = ({
  component: Component,
  path,
  exact,
  ...rest
}) => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (
        data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      )}
    />
  )
}
