import React from 'react';
import firebase from '../../firebase.js';
import { BrowserRouter as Router, Link } from "react-router-dom";

import './AddCity.css';

class AddCity extends React.Component{
	_isMounted = false;

	constructor(props){
		super(props);
		this.state = {
			name: '',
			info: '',
			cover: '',
			cities: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e){
		e.preventDefault();
		const id = this.state.cities.length;
		const itemsRef = firebase.database().ref('cities');

		const city = {
			cityId: id + 1,
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
		this._isMounted = true;
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
			if(this._isMounted){
				this.setState({
					cities: newState
				});
			}
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	removeCity(cityId){
		const itemRef = firebase.database().ref(`/cities/${cityId}`);
		itemRef.remove();
	}

	render(){
		return(
			<div className="addcity-wrapper">
				<div className="addleft">
					<ul className="all-cities">
						{this.state.cities.map((city) => {
							return(
								<li key={city.id}>
									<img src={city.cover} alt={city.name} />
									<h3>{city.name} <a href="#!" onClick={() => this.removeCity(city.id)}><i className="fa fa-times"></i></a></h3>
									<p>{city.info}</p>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="addright">
					<h1>Add City</h1>
					<form onSubmit={this.handleSubmit}>
						<input className="form-input" type="text" name="cover" onChange={this.handleChange} value={this.state.cover} placeholder="Upload Image" />
						<input className="form-input" type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="City Name" />
						<textarea className="form-input" name="info" rows="5" onChange={this.handleChange} value={this.state.info} placeholder="City description"></textarea>					
						<button className="add-btn">Add City</button>
					</form>
					<Link className="dif-link" to="/add-resto/">Add Resto</Link>
				</div>
			</div>
		);
	}
}

export default AddCity;