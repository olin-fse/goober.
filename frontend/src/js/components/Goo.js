import React, { Component } from 'react';
import {Row, Col, Card, Icon, Button, Chip} from 'react-materialize';
import Moment from 'react-moment';
import 'moment-timezone';

import axios from 'axios';

class Goo extends Component{
  constructor(props){
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(){
    this.props.deleteGoo(this.props.data._id);
  }
  render(){
    return(
      <Col m={6} s={12}>
  		    <Card className='blue darken-2' textClassName='white-text' title={this.props.data.title} >
            <h5>
              {this.props.data.description + "@" + this.props.data.location}
              <br/>
                  <Moment format="HH:mm dddd MM/DD">
                    {this.props.data.startDate}
                  </Moment>
                  ~
                  <Moment format="HH:mm dddd MM/DD">
                    {this.props.data.endDate}
                  </Moment>
            </h5>
            <hr/>
            <Row>
              <Col className='left '>
            			<Icon small>person</Icon> {this.props.data.maxPeople}
              </Col>
              <Col className='right'>
                <Button floating className='white' onClick={this.handleDeleteClick}><Icon className='black'>delete</Icon></Button>
              </Col>
            </Row>
  		    </Card>
      </Col>
    );
  }
}

export default Goo
