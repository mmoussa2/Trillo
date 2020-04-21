import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from "../../graphql/queries";
import Logout from './logout';

function SessionButtons() {
  const { data } = useQuery(IS_LOGGED_IN);
  if (data.isLoggedIn) {
    return (
      <div className="session-buttons">
        <div></div>
        <Logout/> 
      </div>
    )
  } else { 
    return (
      <div className="session-buttons">
        <Link className="session-button" to="/login">Login</Link>
        <Link className="session-button" to="/register">Register</Link>
      </div>
    )
  }
}

export default SessionButtons;
