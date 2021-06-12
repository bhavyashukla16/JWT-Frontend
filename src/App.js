import './App.css';
import AddUserDetails from './components/AddUserDetails';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Details from './components/Details';

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route exact path='/' component={ Login } />
          <Route path='/addUser' component={ AddUserDetails } />
          <Route path='/userDetails' component={ Details } />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
