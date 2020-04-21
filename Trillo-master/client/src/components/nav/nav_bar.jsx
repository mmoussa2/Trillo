import React from 'react';
import LogoButton from './logo_button';
import SessionButtons from './session_buttons';
import './nav.css';

function NavBar() {
  return (
    <div className="nav-bar">
      <LogoButton/>
      <SessionButtons/>
    </div>
  )
}

export default NavBar;