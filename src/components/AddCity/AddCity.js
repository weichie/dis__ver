import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';

import './AddCity.css';

class AddCity extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			info: '',
			cover: '',
			cities: [],
			user: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
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
			})
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e){
		e.preventDefault();
		const itemsRef = firebase.database().ref('cities');
		const city = {
			name: this.state.name,
			info: this.state.info,
			cover: this.state.cover,
		}
		itemsRef.push(city);
		this.setState({
			name: '',
			info: '',
			cover: '',
		});
	}

	componentDidMount(){
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({user});
			}
		})

		const itemsRef = firebase.database().ref('cities');
		itemsRef.on('value', (snapshot) => {
			let cities = snapshot.val();
			let newState = [];
			for (let city in cities){
				newState.push({
					id: city,
					name: cities[city].name,
					info: cities[city].info,
					cover: cities[city].cover
				});
			}
			this.setState({
				cities: newState
			});
		})
	}

	removeCity(cityId){
		const itemRef = firebase.database().ref(`/cities/${cityId}`);
		itemRef.remove();
	}

	render(){
		return(
			<div className="addCity-wrapper">
				<h1>Add City</h1>

				{this.state.user ? 
					<button onClick={this.logout}>Logout</button>
				:
					<button onClick={this.login}>Login</button>
				}

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="cover" onChange={this.handleChange} value={this.state.cover} placeholder="Upload Image" />
					<input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="City Name" />
					<textarea name="info" onChange={this.handleChange} value={this.state.info} placeholder="What are you bringing?"></textarea>
					<button>Add Item</button>
				</form>

				<ul className="all-cities">
					{this.state.cities.map((city) => {
						return(
							<li key={city.id}>
								<h3>{city.name}</h3>
								<p>{city.info}</p>
								<button onClick={() => this.removeCity(city.id)}>Remove</button>
							</li>
						);
					})}
				</ul>

			</div>
		);
	}
}

export default AddCity;