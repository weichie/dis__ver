import React from 'react';
import firebase from '../../firebase.js';
import { Link } from 'react-router-dom';

import './Auth.css';
import Login from './Login';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const {email, password} = this.state;

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				const itemsRef = firebase.database().ref('users');
				const storeUser = {
					email: user.user.email,
					uid: user.user.uid
				}
				itemsRef.push(storeUser).then(()=>{
					this.props.history.push('/');
				}).catch(error => {
					this.setState({error: error});
				});
			})
			.catch(error => {
				this.setState({error: error});
			});
	}

	render(){
		const {email, password, error} = this.state;
		return(
			<div className="login-wrapper">
				<div className="image-bg"></div>
				<div className="text-section">
					<div className="inner">	
						<h1>Register your account</h1>
						<p className="intro-text">
							Feel no longer lost in a new city! Use your friends recommendations to guide you.
						</p>
						{error && <p className="error-message">{error.message}</p>}
						<form onSubmit={this.handleSubmit}>
							<input type="text" name="email" placeholder="Your Email" value={email} onChange={this.handleChange} />
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={this.handleChange}
							/>
							<button className="general-submit" children="Get Started" />
							<p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;