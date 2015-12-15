import React from 'react';
import ReactFireMixin from 'reactfire';
import VoteMixin from './../../mixins/vote.mixin';
import firebaseConnection from '../../util/firebase.connection.js';
import {Panel} from 'react-bootstrap';
import {History} from 'react-router';

export default React.createClass({

  mixins: [ReactFireMixin, VoteMixin, History],

  getInitialState() {
    return {
      beer : {
        '.key': '',
        name: '',
        style: {
          name: ''
        },
        brewer: {
          name: ''
        },
        labels: {
          medium: ''
        },
        stocked: false,
        votes: 0
      }
    }
  },

  componentDidMount() {
    this.bindAsObject(firebaseConnection.child('/beers/' + this.props.params.id), 'beer');
  },


  uploadFile(e) {
    let file = e.target.files[0];
    this.firebaseRefs.beer.set({img: file});
  },

  render() {
    let {beer} = this.state;

    return (
        <Panel header={<div onClick={() => this.history.goBack()}>Go back</div>}>
          <h2>{beer.name}</h2>
        </Panel>
    );
  }
});
