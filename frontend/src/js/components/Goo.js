import React, { Component } from 'react';
import {Row, Col, Card, Icon, Button} from 'react-materialize';
import axios from 'axios';

class Goo extends Component{
  constructor(props){
    super(props);
    
    this.deleteGoo = this.deleteGoo.bind(this);
  }
  deleteGoo(){
    if(confirm('Delete this Goo?')){
      const deleteGooLink = '/goo/' + this.props.data._id;
      console.log("Sending delete request to " + deleteGooLink);
      axios
        .delete(deleteGooLink)
        .then(res => {
          return '/'
        })
        .catch(err => console.log(err));
    }
  }
  render(){
    return(
      <Col m={6} s={12}>
  		    <Card className='blue darken-2' textClassName='white-text' title={this.props.data.title} >
  		      {this.props.data.description + "@" + this.props.data.location}
            <hr/>
            <Row>
            <Col s={3}>
              <Button floating className='white' onClick={this.deleteGoo}><Icon className='black'>delete</Icon></Button>
            </Col>
            </Row>
  		    </Card>
      </Col>
    );
  }
}

export default Goo
