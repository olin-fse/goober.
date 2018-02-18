import React, { Component } from 'react';
import {Row, Col, Card, Icon, Button, Chip} from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class Goo extends Component{
  constructor(props){
    super(props)
    this.deleteGoo = this.deleteGoo.bind(this);
    this.deleteNotify = this.deleteNotify.bind(this);
  }
  deleteNotify(){
    toast("Goo Succesfully Deleteed", {
      type: toast.TYPE.INFO,
      hideProgressBar: true,
      pauseOnHover: false,
    });
  }
  deleteGoo(){
    if(confirm('Delete this Goo?')){
      const deleteGooLink = '/goo/' + this.props.data._id;
      console.log("Sending delete request to " + deleteGooLink);
      axios
        .delete(deleteGooLink)
        .then(() => {
          this.deleteNotify();
        })
        .catch(err => console.log(err));
    }
  }
  render(){
    return(
      <Col m={6} s={12}>
        <ToastContainer autoClose={2000}/>
  		    <Card className='blue darken-2' textClassName='white-text' title={this.props.data.title} >
            <h5>
              {this.props.data.description + "@" + this.props.data.location}
              <br/>
              {this.props.data.startDate + "~" + this.props.data.endDate}
            </h5>
            <hr/>
            <Row>
              <Col className='left '>
            			<Icon small>person</Icon> {this.props.data.maxPeople}
              </Col>
              <Col className='right'>
                <Button floating className='white' onClick={this.deleteGoo}><Icon className='black'>delete</Icon></Button>
              </Col>
            </Row>
  		    </Card>
      </Col>
    );
  }
}

export default Goo
