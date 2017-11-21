import React from 'react';
import {NavLink} from 'react-router-dom';

const link = {
  width: '150px',
  padding: '10px',
  margin: '0 6px 6px',
  textAlign: 'center',
  background: '#f17f1a',
  display: 'inline-block',
  fontSize: '13px',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '.28571429rem'
}

const NavBar = () => {
  return (
    <div className='nav-in'>
      <NavLink
      to = '/signup'
      exact
      style={link}
      activeStyle={{
      background: '#868079'}}
      >Sign Up</NavLink>
    </div>
  );
}

export default NavBar
