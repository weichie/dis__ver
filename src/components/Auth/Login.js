import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import firebase from '../../firebase';

import Register from './Register';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const {email, password} = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({error});
			});
	}

	render(){
		const {email, password, error} = this.state;
		return(
			<div className="login-wrapper">
				<h1>Login</h1>
				{error && <p className="error-message">{error.message}</p>}
				<form className="login-form" onSubmit={this.handleSubmit}>
					<input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
					<input 
						type="password"
						name="password"
						placeholer="password"
						value={password}
						onChange={this.handleChange}
					/>
					<button>Log in</button>
				</form>
			</div>
		);
	}
}

export default Login;