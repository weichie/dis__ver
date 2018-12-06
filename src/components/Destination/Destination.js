import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
	width: '50vw',
	height: '100vh'
}

class Destination extends React.Component{
	render(){
		return(
			<div className="map-wrapper">
				<Map 
					google={this.props.google}	
					zoom={14}
					style={mapStyles}
					initialCenter={{
						lat: -1.2884,
						lng: 36.8233
					}}
				/>
			</div>
		);
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAqyNvjD0kNMcP0uD0c1AHeOVWoKnBf_Ps'
})(Destination);