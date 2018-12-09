import React from 'react';
import firebase from '../../firebase.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './EditResto.css';

class EditResto extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			resto: {},
			updated: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		const {match: {params}} = this.props;
		const itemRef = firebase.database().ref(`/restos/${params.id}`);
		if(itemRef){
			itemRef.on('value', snapchot => {
				let resto = snapchot.val();
				this.setState({resto});
			});
		}else{
			this.setState({resto: null});
		}
	}

	handleChange(e){
		let resto = {...this.state.resto}
		resto[e.target.name] = e.target.value;
		this.setState({resto});
	}

	handleSubmit(e){
		e.preventDefault();
		const {match: {params}} = this.props;
		const itemsRef = firebase.database().ref('restos');
		itemsRef.update({
			[params.id]: {...this.state.resto}
		});
		this.setState({updated: true});
		setTimeout(() => {
			this.setState({updated: false});
		}, 1000);
	}

	render(){
		const resto = (this.state.resto) ? `Edit: ${this.state.resto.name}` : 'Resto does not exist...';
		const updateState = (this.state.updated) ? <span className="update-state">Updated!</span> : '';
		const renderInputs = Object.keys(this.state.resto).map((item, i) => {
			return(
				<div key={i} className="edit-row">
					<label htmlFor={`edit-${i}`}>{item}</label>
					<input 
						id={`edit-${i}`}
						name={item}
						type="text"
						placeholder={item}
						defaultValue={this.state.resto[item]}
						onChange={this.handleChange}
					/>
				</div>
			);
		});

		return(
			<div className="edit-wrapper">
				<h1>{resto}</h1>
				{updateState}
				<form onSubmit={this.handleSubmit}>
					{renderInputs}
					<button className="add-btn">Update Resto</button>
					<Link className="cancel-button" to="/add-resto">Cancel</Link>
				</form>
			</div>
		);
	}
}
export default EditResto;