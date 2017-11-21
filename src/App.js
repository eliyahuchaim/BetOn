import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import SignUp from './components/signup';

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <NavBar />
          </div>
          <div>
            <Route exact path='/signup' component={SignUp} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, null)(App);
