import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import '../less/app.less';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

// const Goos = Loadable({
//   loader: () => import('./routes/Goos'),
//   loading: Loading,
// });

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
  </Router>
);

class App extends Component {
  render() {
    return (
      <div>
        <GooForm />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
