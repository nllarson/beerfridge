import dispatcher from '../flux/flux.dispatcher';

var BeerFridgeActions = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  CREATE_BEER: 'CREATE_BEER',
  UPDATE_BEER: 'UPDATE_BEER',
  VOTE: 'VOTE',

  getProfile: function () {
    dispatcher.handleViewAction({
      actionType: BeerFridgeActions.GET
    });
  },

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
  },

  updateFilter: function(data) {
    dispatcher.handleViewAction({
      actionType: BeerFridgeActions.FILTER,
      selectedFilters: data
    });
  }

};

export default BeerFridgeActions;
