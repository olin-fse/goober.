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
      <Col className='Goo'>
  		    <Card className='blue darken-3' textClassName='white-text' title={this.props.data.title} >
            <h5>
              <div className="location">@ {this.props.data.location}</div>
              <div className="description">{this.props.data.description}</div>
              <div className="time">
                  <Moment className="startTime" format="hh:mm">
                    {this.props.data.startDate}
                  </Moment>
                   ~
                  <Moment className="endTime" format="hh:mm">
                    {this.props.data.endDate}
                  </Moment>
              </div>
              <div>
                  <Moment className="date" format="dddd, MMMM Do">
                    {this.props.data.endDate}
                  </Moment>
              </div>
            </h5>
            <hr/>
            <Row>
              <Col className='left maxPeople'>
            			<Icon small>person</Icon> {this.props.data.maxPeople}
              </Col>
              <Col className='right'>
                <Button floating className='white deleteButton' onClick={this.handleDeleteClick}><Icon className='black'>delete</Icon></Button>
              </Col>
            </Row>
  		    </Card>
      </Col>
    );
  }
}

export default Goo
