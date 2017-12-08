import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

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


const NavBar = (props) => {

  const mainLogout = (props) => {
    // debugger
    props.logout();
    props.history.push("/login");
  }

  if (localStorage.what_you_looking_at) {
    return (
      <div className='nav-in'>
        <Button onClick={() => {mainLogout(props)}}
        >Logout</Button>
        <NavLink
        to = '/userpage'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Your Page</NavLink>
      </div>
    )
  } else {
    return (
      <div className='nav-in'>
        <NavLink
        to = '/signup'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Sign Up</NavLink>
        <NavLink
        to = '/login'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Login</NavLink>
        <NavLink
        to = '/search'
        exact
        style={link}
        activeStyle={{
        background: '#868079'}}
        >Find Users</NavLink>
      </div>
    )
  }
};

export default withRouter(NavBar);
