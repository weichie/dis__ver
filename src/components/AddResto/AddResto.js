import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import './AddResto.css';

class AddResto extends React.Component{
	render(){
		return(
			<div className="addcity-wrapper">
				<div className="addleft">
					<ul className="all-cities">
						<li>
							<h3>test resto</h3>
							<p>test information</p>
						</li>
					</ul>
				</div>
				<div className="addright">
					<h1>Add Resto</h1>
					<form>
						<input className="form-input" type="text" name="cover" placeholder="Upload Image" />
						<input className="form-input" type="text" name="name" placeholder="Resto Name" />
						<input className="form-input" type="text" name="latln" placeholder="Latitude" />
						<input className="form-input" type="text" name="lonln" placeholder="Longitude" />
						<textarea className="form-input" name="info" rows="5" placeholder="Resto Description"></textarea>
						<button className="add-btn">Add Resto</button>
					</form>
					<Link className="dif-link" to="/add-city/">Add City</Link>
				</div>
			</div>
		);
	}
}

export default AddResto;