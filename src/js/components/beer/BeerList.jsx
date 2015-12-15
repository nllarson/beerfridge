import React from 'react';
import ReactFireMixin from 'reactfire';
import firebaseConnection from '../../util/firebase.connection.js';
import {ListGroup} from 'react-bootstrap';
import Item from './../Item.jsx';
import VoteMixin from './../../mixins/vote.mixin';

export default React.createClass({

  mixins: [ReactFireMixin, VoteMixin],

  getInitialState() {
    return {
      beers : []
    }
  },

  componentDidMount() {
    this.bindAsArray(firebaseConnection.child('/beers').orderByChild('name'), 'beers');
  },

  render() {
    return (
        <ListGroup>
          {this.state.beers.map((beer, index) =>
          <Item vote={this.handleVote} key={index} item={beer} />
              )}
        </ListGroup>
    );
  }
});
