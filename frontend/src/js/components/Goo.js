import React, { Component } from 'react';
import {Col, Card} from 'react-materialize';

class Goo extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }

  render(){
    return(
      <Col m={6} s={12}>
  		    <Card className='blue' textClassName='white-text' title={this.props.data.title} >
  		      {this.props.data.description + "@" + this.props.data.location}
  		    </Card>
      </Col>
    );
  }
}

export default Goo
