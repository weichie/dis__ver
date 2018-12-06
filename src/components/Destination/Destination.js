import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

// import CurrentLocation from '../Map.js'; ADD IN LATER
import mapConfig from './apiKeys.js';
import './Destination.css';

const mapStyles = {
	width: '50vw',
	height: '100vh',
	position: 'fixed'
}

class Destination extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		};
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	}

	onClose = props => {
		if (this.state.showingInfoWindow){
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	render(){
		return(
			<div className="map-wrapper">
				<Map 
					google={this.props.google}	
					zoom={13} 
					style={mapStyles} 
					initialCenter={{lat: 40.737355, lng: -73.992580}}
				>

					<Marker 
						onClick={this.onMarkerClick} 
						name={'Wonton Noodle Garden'} 
						description={'Wonton Noodle Garden Description'}
						position={{ lat: 40.715846, lng: -73.998261 }}
					/>
					<Marker 
						onClick={this.onMarkerClick} 
						name={'Blockheads'} 
						description={'Blockheads description'}
						position={{ lat: 40.731278, lng: -73.989033 }}
					/>
					<Marker
						onClick={this.onMarkerClick} 
						name={'Brother Jimmy\'s BBQ'} 
						description={'BBQ description'}
						position={{ lat: 40.750311, lng: -73.994669 }}
					/>

					<InfoWindow 
						marker={this.state.activeMarker}
						visible={this.state.showingInfoWindow}
						onClose={this.onClose}
					>
						<div>
							<h4>{this.state.selectedPlace.name}</h4>
							<p>{this.state.selectedPlace.description}</p>
						</div>
					</InfoWindow>
				</Map>
				<div className="map-content">
					<h4>{this.state.selectedPlace.name}</h4>
					<h1 onClick={this.onMarkerClick}>test</h1>
				</div>
			</div>
		);
	}
}

export default GoogleApiWrapper(mapConfig.mapConfig[0])(Destination);