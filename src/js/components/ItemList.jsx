import React from 'react';
import {ListGroup, Alert} from 'react-bootstrap';
import Item from './Item.jsx';

export default React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    name: React.PropTypes.string,
    vote: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      items: [],
      name: '',
      vote() {}
    };
  },

  render() {
    let {items} = this.props;

    if (items.length === 0) {
      return (
        <Alert bsStyle="warning">
          <strong>NO!!</strong> The Beer Fridge Is Empty!  Let @nllarson Know!
        </Alert>
      );
    }

    return (
      <ListGroup>
        {items.map((item, index) =>
          <Item vote={this.props.vote} key={index} item={item} />
        )}
      </ListGroup>
    );
  }
});
