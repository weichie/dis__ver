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
import EditCity 		from './components/EditCity/EditCity';
import EditResto 		from './components/EditResto/EditResto';
import Register 		from './components/Auth/Register';
import Login 			from './components/Auth/Login';
import Logout 			from './components/Auth/Logout';
import Profile 		from './components/Profile/Profile';

class AppRouter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: null,
			userEmail: null,
			menuOpen: false
		}
		// this.login = this.login.bind(this);
		// this.logout = this.logout.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}

	// logout(){
	// 	auth.signOut()
	// 		.then(() => {
	// 			this.setState({
	// 				user: null,
	// 				userEmail: null
	// 			});
	// 		});
	// }

	// login(){
	// 	auth.signInWithPopup(provider)
	// 		.then(result => {
	// 			const user = result.user;
	// 			this.setState({
	// 				user,
	// 				userEmail: user.email
	// 			});
	// 		});
	// }

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
					{!this.state.userEmail ? (
						<ul className="auth-menu">
							<li><Link to="/register">Register</Link></li>
							<li><Link to="/login">Login</Link></li>
						</ul>
					) : (
						<ul className="auth-menu">
							<li><Link to={`/profile/${this.state.user.uid}`}>Profile</Link></li>
							<li><Logout /></li>
						</ul>
					)}
					{/*<Login login={this.login} logout={this.logout} currentLogged={this.state.user} />*/}

					<div className="openMenu" onClick={() => this.handleMenu()}>menu</div>

					<nav className={(this.state.menuOpen) ? 'main-nav open' : 'main-nav'}>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/add-city">ADD</Link>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/">Home</Link>
						<Link onClick={()=>this.hideMenu()} to="/discover/">Discover</Link>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/destinations/">Destination</Link>
						<Link onClick={()=>this.hideMenu()} className="dark-link" to="/about">About</Link>
					</nav>

					<Switch>
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/" exact component={Home} />
						<Route path="/destinations" component={Destination} />
						<Route path="/about" component={About} />
						<Route path="/add-city" component={AddCity} />						
						<Route path="/add-resto" component={AddResto} />
						<Route path="/discover" component={Discover} />
						<Route path="/resto" component={Resto} />
						<Route path="/edit-city/:id" component={EditCity} />
						<Route path="/edit-resto/:id" component={EditResto} />
						<Route path="/add-city" component={AddCity} />
						<Route path="/profile/:id" component={Profile} />
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
