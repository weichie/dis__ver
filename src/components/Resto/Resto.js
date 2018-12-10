import React from 'react';

import './Resto.css';

class Resto extends React.Component{
	render(){
		const resto = this.props.location.state.current_resto;
		
		return(
			<div className="resto-wrapper">
				<div className="resto--cover" style={{backgroundImage: `url('${resto.cover}')`}}>
					
				</div>
				<div className="about-info resto--info">
					<div className="inner">
						<h4>{resto.type}</h4>
						<h1>{resto.name}</h1>
						<small>{resto.address}</small>
						<p>
							{resto.info}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Resto;