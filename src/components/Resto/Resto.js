import React from 'react';

import './Resto.css';

class Resto extends React.Component{
	constructor(props){
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render(){
		const resto = this.props.location.state.current_resto;
		const resto_link = encodeURIComponent(resto.address);

		return(
			<div className="resto-wrapper">
				<div className="resto--cover" style={{backgroundImage: `url('${resto.coverUrl}')`}}>
					
				</div>
				<div className="about-info resto--info">
					<div className="inner">
						<h4>{resto.type}</h4>
						<h1>{resto.name}</h1>
						<a className="direction-link" href={`https://www.google.com/maps/dir/?api=1&query=${resto_link}`}><small>{resto.address}</small></a>
						<p>
							{resto.info}
						</p>
						<a className="goback-link" onClick={this.goBack}>Back to overview</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Resto;