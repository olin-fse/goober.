import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../less/app.less';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div>
        <GooForm />
      </div>
    );
  }
}

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
      <div>
        <h2>Create New Goo</h2>
        <form onSubmit={this.handleSubmit}>
         <label>
           Title :
           <input name='title' type="text" value={this.state.title} onChange={this.handleChange} />
         </label>
         <br/>
         <label>
           Location :
           <input name='location' type="text" value={this.state.location} onChange={this.handleChange} />
         </label>
         <br/>
         <label>
           Description :
           <textarea name='description' value={this.state.description} onChange={this.handleChange}></textarea>
         </label>
         <br/>

         <label>
           Max People :
           <select name='maxPeople' value={this.state.maxPeople} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
         </label>
         <br/>
         <input type="submit" value="Submit" />
       </form>
    </div>
    );
  }
}



ReactDOM.render(<App/>, document.getElementById('container'));
