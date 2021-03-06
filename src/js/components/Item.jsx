import React from 'react';
import {ListGroupItem, Glyphicon, Row, Col} from 'react-bootstrap';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    vote: React.PropTypes.func,
    index: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      item: {
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
    };
  },

  render() {
    let {item} = this.props;
    return (
      <ListGroupItem href={'#/view/' + item['.key']}>
        <Row>
          <Col lg={1} md={1} sm={1}>
            {item.votes}
          </Col>
          <Col lg={10} md={10} sm={10}>
            <h2>{item.name}</h2>
            <p>{item.brewer.name} - {item.style.name}</p>
            <img src={item.labels.medium}/>
          </Col>
          <Col lg={1} md={1} sm={1}>
            {item.stocked ? <Glyphicon className="stocked" glyph="ok"/> : ''}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});
