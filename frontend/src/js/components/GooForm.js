import React, { Component } from 'react';
import {Input, Button, Row, Col, Icon} from 'react-materialize';
import axios from 'axios';

class GooForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      location : '',
      description : '',
      startDate : new Date(),
      endDate : new Date(),
      tags : [],
      people : [],
      maxPeople : 4,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    const data = this.state;
    axios.post('/goos', data)
    .then(function (res){
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
    event.preventDefault();
  }
  render() {
    return (
      <Row>
        <Col s='8'><h5>Create New Goo</h5></Col>
        <Col>
          <form>
            <Input s={8} label='title' name='title' type="text" value={this.state.title} onChange={this.handleChange} />
            <Input s={8} label='location' name='location' type="text" value={this.state.location} onChange={this.handleChange} />
            <Input s={12} label='description' name='description' value={this.state.description} onChange={this.handleChange}/>
            <Input s={3} label='Max People' type='select' defaultValue='2' name='maxPeople' value={this.state.maxPeople} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Input>
            <Col s={12}>
              <Button className="blue darken-4" type="submit" value="Submit" onClick={this.handleSubmit}>SUBMIT</Button>
            </Col>
          </form>
        </Col>
      </Row>
    );
  }
}
export default GooForm;
