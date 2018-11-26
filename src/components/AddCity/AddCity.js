import React from 'react';
import firebase from '../../firebase.js';

import './AddCity.css';

class AddCity extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentItem: '',
			username: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render(){
		return(
			<div className="addCity-wrapper">
				<h1>Add City</h1>
				<form>
					<input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="What's your name?" />
					<input type="text" name="currentItem" onChange={this.handleChange} value={this.state.currentItem} placeholder="What are you bringing?" />
					<button>Add Item</button>
				</form>

				<ul className="all-cities">

				</ul>
			</div>
		);
	}
}

export default AddCity;