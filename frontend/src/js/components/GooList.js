import React, { Component } from 'react';
import {Row, Col} from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import Goo from './Goo';
import axios from 'axios';

class GooList extends Component{
  constructor(){
    super();
    this.state = {
      goos : [],
    };
    this.deleteGoo = this.deleteGoo.bind(this);
    this.deleteNotify = this.deleteNotify.bind(this);
  }
  componentDidMount(){
    axios.get('/goos')
    .then(res => {
      this.setState({goos:res.data});
    })
    .catch(err => console.log(err));
  }
  deleteNotify(){
    toast("Goo Succesfully Deleted", {
      type: toast.TYPE.INFO,
      hideProgressBar: true,
      pauseOnHover: false,
    });
  }
  deleteGoo(gooID){
    if(confirm('Delete this Goo?')){
      const deleteGooLink = '/goo/' + gooID;
      console.log("Sending delete request to " + deleteGooLink);
      axios
        .delete(deleteGooLink)
        .then(() => {
          const gooList = this.state.goos;
          var filtered = [];
          for (var i = 0; i < gooList.length; i++) {
              if (gooList[i]._id != gooID) {
                  filtered.push(gooList[i]);
              }
          }
          this.setState({goos: filtered});
          this.deleteNotify();
        })
        .catch(err => console.log(err));
    }
  }
  render(){
    const gooList = this.state.goos;
    const goos = gooList.map((goo) =>
      <Goo key={goo._id} data={goo} deleteGoo={this.deleteGoo}/>
    );
    return(
      <Row>
        <Col>
          <ToastContainer className='deleteToast' autoClose={2000}/>
            <ul className='GooList'>
              {goos}
            </ul>
        </Col>
      </Row>
    );
  }
}
export default GooList;
