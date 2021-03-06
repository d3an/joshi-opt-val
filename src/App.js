import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Interface from './components/Interface'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" component={Interface} />
            <Route exact path="/index.htm" component={Interface} />
            <Route exact path="/index.html" component={Interface} />

            {/* <footer>Copyright &copy; James Bury 2020.</footer>*/}
          </div>
        </Router>
    );
  }
}

export default App;
