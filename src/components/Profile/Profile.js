import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';

import './Profile.css';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userId: this.props.match.params.id,
			user: {
				username: firebase.auth().currentUser && firebase.auth().currentUser.displayName,
				userphone: firebase.auth().currentUser && firebase.auth().currentUser.phoneNumber,
			},
			error: '',
			success: false,
		}
		this.updateProfile = this.updateProfile.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = e => {
		let updateUser = {...this.state.user};
		updateUser[e.target.name] = e.target.value;
		this.setState({user: updateUser});
	}

	updateProfile = e => {
		e.preventDefault();
		firebase.auth().currentUser.updateProfile({
			displayName: this.state.user.username,
			phoneNumber: this.state.user.userphone
			// photoURL: "https://example.com/jane-q-user/profile.jpg"
		}).then(newUser => {
			const userRef = firebase.database().ref('users');
			this.setState({success: true});
			setTimeout(() => {
				this.setState({success: false});
			}, 1000);
		}).catch(error => {
			this.setState({error});
		});
	}

	render(){
		let { username, userphone } = this.state.user;
		return(
			<div className="profile-wrapper">
				<h1>Profile {this.state.user.username && <span>for {this.state.user.username}</span>}</h1>
				{this.state.success && <p className="success-message">Profile updated!</p>}
				{this.state.error && <p className="error-message">{this.state.error.message}</p>}

				<form onSubmit={this.updateProfile}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" placeholder="username" onChange={this.handleChange} value={username ? username : ''}/>
					<label htmlFor="userphone">Phone Number</label>
					<input type="text" name="userphone" id="userphone" placeholder="Your Phone" onChange={this.handleChange} value={userphone ? userphone : ''}/>
					<button className="general-submit">Update profile</button>
				</form>
			</div>
		);
	}
}

export default Profile;