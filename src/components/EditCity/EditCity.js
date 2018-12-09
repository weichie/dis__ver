import React from 'react';
import firebase from '../../firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './EditCity.css';

class EditCity extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			city: {},
			updated: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		const {match: {params}} = this.props;
		const itemRef = firebase.database().ref(`/cities/${params.id}`);
		if(itemRef){
			itemRef.on('value', (snapshot) => {
				let city = snapshot.val();
				this.setState({city});
			});
		}else{
			this.setState({city: 'none'});
		}
	}

	handleChange(e){
		let city = {...this.state.city};
		const key = e.target.name;
		city[key] = e.target.value;
		this.setState({city});
	}

	handleSubmit(e){
		e.preventDefault();
		const {match: {params}} = this.props;
		const itemsRef = firebase.database().ref('cities');
		itemsRef.update({
			[params.id]: {...this.state.city}
		});
		this.setState({updated: true});
		setTimeout(() => {
			this.setState({updated: false});
		}, 1000);
	}

	render(){
		const city = (this.state.city) ? `Edit: ${this.state.city.name}` : 'City does not exist...';
		const renderInputs = Object.keys(this.state.city).map((item, i) => {
			return(
				<div key={i} className="edit-row">
					<label htmlFor={`edit-${i}`}>{item}</label>
					<input 
						id={`edit-${i}`} 
						name={item} 
						type="text" 
						placeholder={item} 
						defaultValue={this.state.city[item]} 
						onChange={this.handleChange}
					/>
				</div>
			);
		});

		const updateState = (this.state.updated) ? <span className="update-state">Updated!</span> : '';

		return(
			<div className="edit-wrapper">
				<h1>{city}</h1>
				{updateState}
				<form onSubmit={this.handleSubmit}>
					{renderInputs}
					<button className="add-btn">Update City</button>
					<Link className="cancel-button" to="/add-city">Cancel</Link>
				</form>
			</div>
		);
	}
}

export default EditCity;