import React from 'react';
import firebase from '../../firebase.js';

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
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({error: error});
			});
	}

	render(){
		const {email, password, error} = this.state;
		return(
			<form onSubmit={this.handleSubmit}>
				{error && <p className="error-message">error.message</p>}
				<input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={this.handleChange}
				/>
				<button children="Register" />
			</form>
		);
	}
}

export default Register;