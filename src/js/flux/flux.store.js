import {EventEmitter} from 'events';
import _ from 'lodash';
import assign from 'object-assign';
import Constants from '../Constants';
import dispatcher from './flux.dispatcher';

let Store = assign({}, EventEmitter.prototype, {

  state: {},
  storagePrefix: null,

  getState() {
    return this.state;
  },

  setState(state) {
    this.state = _.extend(this.state, state);
  },

  setStoragePrefix(prefix) {
    this.storagePrefix = prefix;
  },

  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  authHeader() {
    return {'Authorization': 'Bearer ' + localStorage.getItem(this.storagePrefix + ':' + Constants.AUTH_TOKEN)};
  },

  register(events) {

    dispatcher.register((payload) => {
      let action = payload.action;
      let promise = events[action.actionType];

      if (!_.isUndefined(promise)) {
        promise.apply(this, [payload])
          .then(() => {
            this.emitChange();
          });
      }
      return true;
    });
  }
});

export default Store;
