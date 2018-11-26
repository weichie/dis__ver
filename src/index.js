import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './index.css';

import Home 			from './components/Home/Home';
import About 			from './components/About/About';
import Discover 		from './components/Discover/Discover';
import Destination 	from './components/Destination/Destination';
import Resto 			from './components/Resto/Resto';
import AddCity 		from './components/AddCity/AddCity';

const AppRouter = () => (
	<Router>
		<div className="app">
			<nav className="main-nav">
				<Link className="dark-link" to="/">Home</Link>
				<Link className="dark-link" to="/destinations/">Destination</Link>
				<Link className="dark-link" to="/about">About</Link>
				<Link to="/discover/">Discover</Link>
			</nav>

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/destinations" component={Destination} />
				<Route path="/about" component={About} />
				<Route path="/discover" component={Discover} />
				<Route path="/resto" component={Resto} />
				<Route path="/add-city" component={AddCity} />
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
