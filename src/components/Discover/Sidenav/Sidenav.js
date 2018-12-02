import React from 'react';

import './Sidenav.css';

class Sidenav extends React.Component{
	render(){
		const navItem = this.props.cities
			.map(city => {
				return (city.id === this.props.current) ? 
					<li key={city.id} className="active">
						<a href="#!" onClick={() => this.props.currentHandler(city.id, city.cover, city.name, city.info)}>
							<span className="dot"><em>{city.id}</em></span>
							<span className="city-name">{city.name}</span>
						</a>
					</li>
				: 
					<li key={city.id}>
						<a href="#!" onClick={() => this.props.currentHandler(city.id, city.cover, city.name, city.info)}>
							<span className="dot"><em>{city.id}</em></span>
							<span className="city-name">{city.name}</span>
						</a>
					</li>
				;
			});

		return(
			<div className="sidenav">
				<ul>
					{navItem}
				</ul>
			</div>
		);
	}
}

export default Sidenav;