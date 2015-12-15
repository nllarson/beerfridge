import dispatcher from '../flux/flux.dispatcher';

var BeerFridgeActions = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  VOTE: 'VOTE',

  logout: function() {
    dispatcher.handleViewAction({
      actionType: BeerFridgeActions.LOGOUT
    });
  },

  login: function(data) {
    dispatcher.handleViewAction({
      actionType: BeerFridgeActions.LOGIN,
      userInfo: data
    });
  }

};

export default BeerFridgeActions;
