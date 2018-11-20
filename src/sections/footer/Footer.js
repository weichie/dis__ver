import React from 'react';
import ReactDOM from 'react-dom';
import './Footer.css';

class Footer extends React.Component{
	render(){
		return(
			<footer>
				<a class="dark-link" href="#!">Destinations</a>
				<a class="dark-link" href="#!">Map</a>
				<a class="dark-link" href="#!">About</a>
				<a href="#!">Discover</a>
			</footer>
		);
	}
}

export default Footer;