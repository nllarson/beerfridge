import store from '../flux/flux.store';
import assign from 'object-assign';
import actions from '../actions/beerfridge.actions';
import firebaseConnection from '../util/firebase.connection.js';

let LoginStore = assign({}, store, {

  initialize() {
    let events = {};

    events[actions.LOGOUT] = this.logout;
    events[actions.LOGIN] = this.login;

    this.register(events);
    this.initState();

    return this;
  },

  initState() {
    this.setState({
      user: null
    });
  },

  login(payload) {
    return new Promise(resolve => {
      resolve();
    }).then(() => {
      this.setState({user: payload.action.userInfo});
      firebaseConnection.child('users').child(this.state.user.uid).update({
        name: payload.action.userInfo.google.displayName,
        email: payload.action.userInfo.google.email,
        avatar: payload.action.userInfo.google.profileImageURL
      });
      return true;
    }).catch(response => {
      console.log('Error', response.message);
    });
  },

  logout() {
    return new Promise(resolve => {
      resolve();
    }).then(() => {
      this.initState();
      return true;
    }).catch(response => {
      console.log('Error', response.message);
    });
  }

});

export default LoginStore.initialize();