import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './Home.css';

class Home extends React.Component{
	render(){
		const bg_image = 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress';
		return(
			<div className="home-wrapper" style={{backgroundImage: `url(${bg_image})`}}>
				<div className="dark-filter med"></div>
				<div className="inner">
					<h3>dis__ver</h3>
					<h1>Discover<br />New York</h1>
					<p>
						I lived in New York for 1.5 years and made a list of my personal gems for you to discover! Please keep in mind that this is my personal list, and that I didn't visited every place in the city.
					</p>
					<Link className="discover-link" to="/discover/">
						Start Discovering 
						<span></span>
					</Link>
				</div>
			</div>
		);
	}
}

export default Home;