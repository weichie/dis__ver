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
import AddResto 		from './components/AddResto/AddResto';
import Login 			from './components/Login/Login';

class AppRouter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: null,
			userEmail: null,
			menuOpen: false
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}

	logout(){
		auth.signOut()
			.then(() => {
				this.setState({
					user: null,
					userEmail: null
				});
			});
	}

	login(){
		auth.signInWithPopup(provider)
			.then(result => {
				const user = result.user;
				this.setState({
					user,
					userEmail: user.email
				});
			});
	}

	handleMenu(){
		this.setState({menuOpen: !this.state.menuOpen});
	}

	hideMenu(){
		this.setState({menuOpen: false});	
	}

	componentDidMount(){
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({
					user,
					userEmail: user.email
				});
			}
		});
	}


	render(){
		return(
			<Router>
				<div className="app">
					<Login login={this.login} logout={this.logout} currentLogged={this.state.user} />
					
					<div className="openMenu" onClick={() => this.handleMenu()}>menu</div>

					<nav className={(this.state.menuOpen) ? 'main-nav open' : 'main-nav'}>
						{(this.state.user && this.state.userEmail === 'weichler.bob@gmail.com') ? <Link onClick={()=>this.hideMenu()} className="dark-link" to="/add-city">ADD</Link> : ''}
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/">Home</Link>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/destinations/">Destination</Link>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/about">About</Link>
						<Link onClick={()=>this.hideMenu()} to="/discover/">Discover</Link>
					</nav>

					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/destinations" component={Destination} />
						<Route path="/about" component={About} />
						<Route path="/add-city" component={(this.state.user && this.state.userEmail === 'weichler.bob@gmail.com') ? AddCity : Home} />
						<Route path="/add-resto" component={(this.state.user && this.state.userEmail === 'weichler.bob@gmail.com') ? AddResto : Home} />
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
		<div>No match for <code>{location.pathname}</code></div>
	);
}


// ========================================
ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);
