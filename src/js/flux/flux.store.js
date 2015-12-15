import {EventEmitter} from 'events';
import _ from 'lodash';
import assign from 'object-assign';
import constants from '../util/beerfridge.constants';
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
    this.emit(constants.CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(constants.CHANGE_EVENT, callback);
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
