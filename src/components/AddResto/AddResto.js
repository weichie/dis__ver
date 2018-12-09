import React from 'react';
import firebase from '../../firebase.js';
import { BrowserRouter as Router, Link } from "react-router-dom";

import './AddResto.css';

class AddResto extends React.Component{
	_isMounted = false;

	constructor(props){
		super(props);
		this.state = {
			slug: '',
			name: '',
			address: '',
			info: '',
			cover: '',
			city: '',
			location: '',
			latln: '',
			type: '',
			lonln: '',
			restos: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(e){
		e.preventDefault();
		const itemsRef = firebase.database().ref('restos');

		const resto = {
			slug: this.state.slug,
			cover: this.state.cover,
			name: this.state.name,
			info: this.state.info,
			address: this.state.address,
			type: this.state.type,
			city: parseInt(this.state.city),
			location: this.state.location,
			latln: this.state.latln*1,
			lonln: this.state.lonln*1 
		}
		itemsRef.push(resto);
		this.setState({
			slug: '',
			cover: '',
			name: '',
			info: '',
			city: '',
			location: '',
			latln: '',
			lonln: '',
			address: '',
			type: '',
		});
	}

	componentDidMount(){
		this._isMounted = true;
		const itemsRef = firebase.database().ref('restos');
		itemsRef.on('value', (snapshot) => {
			let restos = snapshot.val();
			let newState = [];
			for(let resto in restos){
				newState.push({
					id: resto,
					slug: restos[resto].slug,
					cover: restos[resto].cover,
					name: restos[resto].name,
					info: restos[resto].info,
					city: restos[resto].city,
					location: restos[resto].location,
					latln: restos[resto].latln,
					lonln: restos[resto].lonln,
					address: restos[resto].address,
					type: restos[resto].type
				});
			}
			if(this._isMounted){
				this.setState({
					restos: newState
				});
			}
		});
	}

	componentWilUnmount(){
		this._isMounted = false;
	}

	removeResto(id){
		console.log(id);
		const itemRef = firebase.database().ref(`/restos/${id}`);
		itemRef.remove();
	}

	render(){
		return(
			<div className="addcity-wrapper">
				<div className="addleft">
					<ul className="all-cities">
						{this.state.restos.map(resto => {
							return(
								<li key={resto.name}>
									<img src={resto.cover} alt={resto.name} />
									<h3>{resto.name} <a href="#!" onClick={() => this.removeResto(resto.id)}><i className="fa fa-times"></i></a></h3>
									<small>{resto.latln} | {resto.lonln} | {resto.location} | cityId: {resto.city}</small>
									<p>{resto.info}</p>
									<Link className="edit-link" to={`/edit-resto/${resto.id}`}>Edit Resto</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="addright">
					<h1>Add Resto</h1>
					<form onSubmit={this.handleSubmit}>
						<input className="form-input" type="text" name="slug" onChange={this.handleChange} value={this.state.slug} placeholder="Resto Slug" />
						<input className="form-input" type="text" name="cover" onChange={this.handleChange} value={this.state.cover} placeholder="Upload Image" />
						<input className="form-input" type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Resto Name" />
						<input className="form-input" type="text" name="location" onChange={this.handleChange} value={this.state.location} placeholder="Location Name" />
						<input className="form-input" type="text" name="city" onChange={this.handleChange} value={this.state.city} placeholder="City ID" />
						<input className="form-input" type="text" name="latln" onChange={this.handleChange} value={this.state.latln} placeholder="Latitude" />
						<input className="form-input" type="text" name="lonln" onChange={this.handleChange} value={this.state.lonln} placeholder="Longitude" />
						<input className="form-input" type="text" name="address" onChange={this.handleChange} value={this.state.address} placeholder="Address" />
						<input className="form-input" type="text" name="type" onChange={this.handleChange} value={this.state.type} placeholder="Type" />
						<textarea className="form-input" name="info" rows="5" onChange={this.handleChange} value={this.state.info} placeholder="Resto Description"></textarea>
						<button className="add-btn">Add Resto</button>
					</form>
					<Link className="dif-link" to="/add-city/">Add City</Link>
				</div>
			</div>
		);
	}
}

export default AddResto;