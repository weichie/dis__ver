import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import mapConfig from './apiKeys.js';

const mapStyles = {
	width: '50vw',
	height: '100vh'
}
console.log(mapConfig);
class Destination extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showingInfo: false,
			activeMarker: {},
			selectedPlace: {}
		}
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfo: true
		});
	}

	onClose = props => {
		if(this.state.showingInfo){
			this.setState({
				showingInfo: false,
				activeMarker: null
			});
		}
	}

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

export default GoogleApiWrapper(mapConfig.mapConfig[0])(Destination);