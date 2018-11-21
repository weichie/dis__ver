import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import './index.css';
import Home from './components/Home/Home';

const AppRouter = () => (
  <Router>
    <div className="app">
      <nav className="main-nav">
      	<Link className="dark-link" to="/map/">Home</Link>
      	<Link className="dark-link" to="/destinations/">Destinations</Link>
			<Link className="dark-link" to="/about/">About</Link>
			<Link to="/discover/">Discover</Link>
      </nav>

      <Route path="/" exact component={Home} />
      <Route component={NoMatch} />
    </div>
  </Router>
);

function NoMatch({ location }) {
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
