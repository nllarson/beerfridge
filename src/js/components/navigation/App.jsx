import React from 'react';
import {Navbar, Nav, NavItem, Button, Glyphicon, Image} from 'react-bootstrap';
import firebaseConnection from '../../util/firebase.connection';
import LoginStore from '../../store/login.store';
import Actions from '../../actions/beerfridge.actions';
import {History} from 'react-router';

export default React.createClass({

  loginStore: LoginStore,
  mixins: [History],

  login: Actions.login,
  logout: Actions.logout,

  getInitialState() {
    return this.loginStore.getState();
  },

  onChange() {
    this.setState(this.loginStore.getState());
  },

  componentWillMount() {
    firebaseConnection.onAuth(authData => {
      if (authData) {
        this.login(authData);
      } else {
        this.logout();
      }
    });
    this.loginStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    this.loginStore.removeChangeListener(this.onChange);
  },

  handleLogin() {
    firebaseConnection.authWithOAuthPopup('google', (error, authData) => {
      if (error) {
        console.log('Login Failed!', error);
      }
    }, {scope: 'email'});
  },

  handleLogout() {
    firebaseConnection.unauth();
  },

  userInfo() {
    if (this.state.user) {
      return (
        <Navbar.Text pullRight>
          <Image circle className='avatar' src={this.state.user.google.profileImageURL}/> <span className="user-info">{this.state.user.google.displayName}</span> <Button className="logout" onClick={() => this.handleLogout()} bsStyle="link">Logout</Button>
        </Navbar.Text>
      );
    } else {
      return (
        <Navbar.Text pullRight>
          <Button onClick={() => this.handleLogin()} bsStyle="link"><Glyphicon glyph="user"/> Login</Button>
        </Navbar.Text>
      );
    }
  },

  render() {
    return (
        <div>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">BeerFridge.info</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#/stocked" active={this.history.isActive('/stocked')}><span className="fa fa-beer"> In Stock</span></NavItem>
                <NavItem eventKey={2} href="#/leaderboard" active={this.history.isActive('/leaderboard')}><span className="fa fa-tasks"> Leaderboard</span></NavItem>
                <NavItem eventKey={3} href="#/list" active={this.history.isActive('/list')}><span className="fa fa-binoculars"> List</span></NavItem>
              </Nav>
              {this.userInfo()}
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            {this.props.children}
          </div>
        </div>
    );
  }
});