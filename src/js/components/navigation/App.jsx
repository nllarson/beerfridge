import React from 'react';
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import firebaseConnection from '../../util/firebase.connection.js';
import {History} from 'react-router';

export default React.createClass({

  mixins: [History],

  getInitialState() {
    return {
      auth: null
    }
  },

  handleLogin() {
    firebaseConnection.authWithOAuthPopup('google', (error, authData) => {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        this.setState({auth :authData});
      }
    });
  },

  render() {
    return (
        <div>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">React-Bootstrap</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#/stocked" active={this.history.isActive('/stocked')}><span className="fa fa-beer"> In Stock</span></NavItem>
                <NavItem eventKey={2} href="#/leaderboard" active={this.history.isActive('/leaderboard')}><span className="fa fa-tasks"> Leaderboard</span></NavItem>
                <NavItem eventKey={3} href="#/list" active={this.history.isActive('/list')}><span className="fa fa-binoculars"> List</span></NavItem>
              </Nav>
              <Navbar.Text pullRight>
              {this.state.auth ? this.state.auth.google.displayName : <Button onClick={() => this.handleLogin()} bsStyle="link"><Glyphicon glyph="user"/> Login</Button>}
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            {this.props.children}
          </div>
        </div>
    );
  }
});