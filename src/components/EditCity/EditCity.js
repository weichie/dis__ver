import React from 'react';
import firebase from '../../firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './EditCity.css';

class EditCity extends React.Component{
	constructor(props){
		super(props);
		this.state = {city: {}};
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

	render(){
		const city = (this.state.city) ? `Edit: ${this.state.city.name}` : 'City does not exist...';
		const renderInputs = Object.keys(this.state.city).map((item, i) => {
			return(
				<div className="edit-row">
					<label for={`edit-${i}`}>{item}</label>
					<input key={i} id={`edit-${i}`} type="text" placeholder={item} value={this.state.city[item]} />
				</div>
			);
		});

		return(
			<div className="edit-wrapper">
				<h1>{city}</h1>
				{renderInputs}
			</div>
		);
	}
}

export default EditCity;