import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import './index.css';
import Home from './components/Home/Home';
import About from './components/About/About';

const AppRouter = () => (
  <Router>
    <div className="app">
      <nav className="main-nav">
      	<Link className="dark-link" to="/">Home</Link>
      	<Link className="dark-link" to="/map/">Destinations</Link>
			<Link className="dark-link" to="/about">About</Link>
			<Link to="/discover/">Discover</Link>
      </nav>

		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/about" component={About} />
			<Route component={NoMatch} />
		</Switch>
    </div>
  </Router>
);

function NoMatch({location}){
	return(
		<div>
			No match for <code>{location.pathname}</code>
		</div>
	);
}


// ========================================
ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);
