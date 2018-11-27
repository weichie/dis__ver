import React from 'react';
import firebase from '../../firebase.js';

import './AddCity.css';

class AddCity extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			info: '',
			cover: '',
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

	render(){
		return(
			<div className="addCity-wrapper">
				<h1>Add City</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="cover" onChange={this.handleChange} value={this.state.cover} placeholder="Upload Image" />
					<input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="City Name" />
					<textarea name="info" onChange={this.handleChange} value={this.state.info} placeholder="What are you bringing?"></textarea>
					<button>Add Item</button>
				</form>

				<ul className="all-cities">

				</ul>
			</div>
		);
	}
}

export default AddCity;