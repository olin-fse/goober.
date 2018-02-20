import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import Goo from './Goo';
import axios from 'axios';

class GooList extends Component{
  constructor(){
    super();
    this.state = {
      goos : [],
    };
  }
  componentDidMount(){
    axios.get('/goos')
    .then(res => {
      this.setState({goos:res.data});
    })
    .catch(err => console.log(err));
  }
  render(){
    const gooList = this.state.goos;
    const goos = gooList.map((goo) =>
      <Goo key={goo._id} data={goo} />
    );
    return(
      <Row>
        <Col>
            <ul>
              {goos}
            </ul>
        </Col>
      </Row>
    );
  }
}
export default GooList;
