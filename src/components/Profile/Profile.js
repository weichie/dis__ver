import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';

import './Profile.css';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userId: this.props.match.params.id,
			userKey: null,
			user: {
				username: firebase.auth().currentUser && firebase.auth().currentUser.displayName
			},
			userData: {},
			error: '',
			success: false,
			userDataSuccess: false
		}
		this.updateProfile = this.updateProfile.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateGeneralData = this.updateGeneralData.bind(this);
	}

	handleChange = e => {
		if(e.target.name === 'username' || e.target.name === 'userphone'){
			let updateUser = {...this.state.user};
			updateUser[e.target.name] = e.target.value;
			this.setState({user: updateUser});
		}else{
			let updateUser = {...this.state.userData};
			updateUser[e.target.name] = e.target.value;
			this.setState({userData: updateUser});
		}
	}

	componentDidMount(){
		if(firebase.auth().currentUser){
			const currentUser = firebase.auth().currentUser.uid;
			const userRef = firebase.database().ref('users');
			userRef.on('value', snapshot => {
				let users = snapshot.val();
				for(let user in users){
					if(users[user].uid === currentUser){
						this.setState({
							userKey: user,
							userData: users[user]
						});
					}
				}
			});
		}
	}

	updateProfile = e => {
		e.preventDefault();
		firebase.auth().currentUser.updateProfile({
			displayName: this.state.user.username
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

	updateGeneralData = e => {
		e.preventDefault();
		console.log(this.state.userKey);
		const userRef = firebase.database().ref('users');
		userRef.update({
			[this.state.userKey]: {...this.state.userData}
		});

		this.setState({userDataSuccess: true});
		setTimeout(() => {
			this.setState({userDataSuccess: false});
		}, 1000);
	}

	render(){
		let { username, userphone } = this.state.user;
		let { email, uid, country, age, sex } = this.state.userData;
		return(
			<div className="profile-wrapper">
				<h1>Profile {this.state.user.username && <span>for {this.state.user.username}</span>}</h1>
				{this.state.success && <p className="success-message">Profile updated!</p>}
				{this.state.error && <p className="error-message">{this.state.error.message}</p>}

				<form onSubmit={this.updateProfile}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" placeholder="username" onChange={this.handleChange} value={username ? username : ''}/>
					<button className="general-submit">Update core data</button>
				</form>

				{this.state.success && <p className="success-message">General Info updated!</p>}
				{this.state.error && <p className="error-message">{this.state.error.message}</p>}
				<form onSubmit={this.updateGeneralData}>
					<label htmlFor="country">Country</label>
					<input type="text" name="country" id="country" placeholder="country" onChange={this.handleChange} defaultValue={country ? country : ''}/>
					<label htmlFor="age">Age</label>
					<input type="text" name="age" id="age" placeholder="age" onChange={this.handleChange} defaultValue={age ? age : ''}/>
					<label htmlFor="sex">Sex</label>
					<input type="text" name="sex" id="sex" placeholder="sex" onChange={this.handleChange} defaultValue={sex ? sex : ''}/>
					<button className="general-submit">Update profile</button>
				</form>
			</div>
		);
	}
}

export default Profile;