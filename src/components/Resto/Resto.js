import React from 'react';

import './Resto.css';

class Resto extends React.Component{
	render(){
		const resto = this.props.location.state.current_resto;
		console.log(resto);
		return(
			<div className="resto-wrapper">
				<div className="resto--cover" style={{backgroundImage: `url('${resto.cover}')`}}>
					
				</div>
				<div className="about-info resto--info">
					<div className="inner">
						<h4>{resto.type}</h4>
						<h1>{resto.name}</h1>
						<p>
							Please keep in mind that the list of restaurants and bars are my personal list. I didn't went to every restaurant in the city and I just kept a small list of the restaurants that I would visit twice or more if I could.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Resto;