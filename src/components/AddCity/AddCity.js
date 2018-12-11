import React from 'react';
import firebase from '../../firebase.js';
import FileUploader from "react-firebase-file-uploader";
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
			isUploading: false,
			progress: 0,
			coverUrl: '',
			cities: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUploadStart = () => {
		this.setState({
			isUploading: true,
			progress: 0
		});
	}

	handleProgress = progress => {
		this.setState({progress});
	}

	handleUploadError = error => {
		this.setState({isUploading: false});
		console.error(error);
	}
	handleUploadSuccess = filename => {
		this.setState({
			cover: filename,
			progress: 100,
			isUploading: false
		});
		firebase
			.storage()
			.ref("cities")
			.child(filename)
			.getDownloadURL()
			.then(url => this.setState({coverUrl: url}));
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
			coverUrl: this.state.coverUrl,
		}
		itemsRef.push(city);
		this.setState({
			name: '',
			info: '',
			coverUrl: '',
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
					cover: cities[city].coverUrl
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
									<Link className="edit-link" to={`/edit-city/${city.id}`}>Edit City</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="addright">
					<h1>Add City</h1>
					<form onSubmit={this.handleSubmit}>
						<label>Cover:</label>
						{this.state.isUploading && <p>Progress: {this.state.progress}</p>}
						{this.state.avatarUrl && <img src={this.state.avatarUrl} />}
						<FileUploader
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={firebase.storage().ref("cities")}
							onUploadStart={this.handleUploadStart}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>

						<input className="form-input" type="text" name="coverUrl" onChange={this.handleChange} value={this.state.coverUrl} placeholder="Upload Image" />
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