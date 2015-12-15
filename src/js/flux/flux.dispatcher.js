import {Dispatcher} from 'flux';
import _ from 'lodash';

let dispatcher = _.extend(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  /**
   * A bridge function between the server and the dispatcher, marking the action
   * as a server action.
   * @param  {object} action The data coming from the view.
   */
  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }

});

export default dispatcher;
