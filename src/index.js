import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import firebase, { auth, provider } from './firebase.js';

import './index.css';

import Home 			from './components/Home/Home';
import About 			from './components/About/About';
import Discover 		from './components/Discover/Discover';
import Destination 	from './components/Destination/Destination';
import Resto 			from './components/Resto/Resto';
import AddCity 		from './components/AddCity/AddCity';
import Login 			from './components/Login/Login';

class AppRouter extends React.Component{
	constructor(props){
		super(props);
		this.state = {user: null}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	logout(){
		auth.signOut()
			.then(() => {
				this.setState({user: null});
			});
	}

	login(){
		auth.signInWithPopup(provider)
			.then(result => {
				const user = result.user;
				this.setState({user});
			});
	}

	componentDidMount(){
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({user});
			}
		});
	}

	render(){
		return(
			<Router>
				<div className="app">
					<Login login={this.login} logout={this.logout} currentLogged={this.state.user} />
					<nav className="main-nav">
						{this.state.user ? <Link className="dark-link" to="/add-city">ADD</Link> : ''}
						<Link className="dark-link" to="/">Home</Link>
						<Link className="dark-link" to="/destinations/">Destination</Link>
						<Link className="dark-link" to="/about">About</Link>
						<Link to="/discover/">Discover</Link>
					</nav>

					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/destinations" component={Destination} />
						<Route path="/about" component={About} />
						<Route path="/add-city" component={(this.state.user) ? AddCity : Home} />
						<Route path="/discover" component={Discover} />
						<Route path="/resto" component={Resto} />
						<Route path="/add-city" component={AddCity} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

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
