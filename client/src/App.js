import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"
function App() {
return(

  <div>
   
      <Router>
      <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
             
      </Router>
  </div>
)
}

export default App;
