import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './index.css';
import Home from './components/Home/Home';

const AppRouter = () => (
  <Router>
    <div className="app">
      <nav className="main-nav">
      	<Link className="dark-link" to="/destinations/">Destinations</Link>
			<Link className="dark-link" to="/map/">Map</Link>
			<Link className="dark-link" to="/about/">About</Link>
			<Link to="/discover/">Discover</Link>
      </nav>

      <Route path="/" exact component={Home} />
    </div>
  </Router>
);


// ========================================
ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);
