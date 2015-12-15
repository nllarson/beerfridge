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
        mfg: '',
        type: '',
        stocked: false,
        votes: 0
      }
    }
  },

  componentDidMount() {
    this.bindAsObject(firebaseConnection.child('/beers/' + this.props.params.id), 'beer');
  },

  handleFileSelect(evt) {
    let f = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        let filePayload = e.target.result;
        this.firebaseRefs.beer.update({img: filePayload});
      };
    })(f);
    reader.readAsDataURL(f);
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
          <form onSubmit={this.uploadFile}>
            <input className="btn btn-default btn-file" type="file" onChange={this.handleFileSelect} accept="image/*;capture=camera"/>
          </form>
        </Panel>
    );
  }
});
