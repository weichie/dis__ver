import React from 'react';
import firebase from '../../firebase.js';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

// import CurrentLocation from '../Map.js'; ADD IN LATER
import mapConfig from './apiKeys.js';
import './Destination.css';

const snazzy = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}];
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
			selectedPlace: {},
			restos: []
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

	componentDidMount(){
		const itemsRef = firebase.database().ref('restos');
		itemsRef.on('value', snapshot => {
			let restos = snapshot.val();
			let newState = [];
			for(let resto in restos){
				newState.push({
					id: resto,
					slug: restos[resto].slug,
					cover: restos[resto].cover,
					name: restos[resto].name,
					info: restos[resto].info,
					city: restos[resto].city,
					location: restos[resto].location,
					latln: restos[resto].latln,
					lonln: restos[resto].lonln,
					address: restos[resto].address,
					type: restos[resto].type
				});
			}
			this.setState({restos: newState});
		});
	}

	render(){
		const markers = this.state.restos.map(resto => {
			return(
				<Marker 
					onClick={this.onMarkerClick} 
					name={resto.name} 
					description={resto.info}
					position={{ lat: resto.latln, lng: resto.lonln }}
				/>
			);
		});

		return(
			<div className="map-wrapper">
				<Map 
					google={this.props.google}	
					zoom={13} 
					style={mapStyles} 
					styles={snazzy}
					initialCenter={{lat: 40.737355, lng: -73.992580}}
				>
					
					{markers}

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