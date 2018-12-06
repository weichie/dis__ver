import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../firebase.js';
import { BrowserRouter as Route, Link } from "react-router-dom";
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
			mapCenter: {},
			mapZoom: 13,
			currentMarker: '',
			restos: []
		};
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onClose = this.onClose.bind(this);
		this.zoomToMarker = this.zoomToMarker.bind(this);
		this.zoomToDefault = this.zoomToDefault.bind(this);
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

	zoomToMarker(latln, lonln, markerId){
		this.setState({
			mapCenter: {lat: latln, lng: lonln},
			mapZoom: 14,
			currentMarker: markerId
		});
	}
	zoomToDefault(){
		this.setState({
			mapZoom: 13,
			currentMarker: ''
		});
	}

	render(){
		const icon_black = {
			url: "https://firebasestorage.googleapis.com/v0/b/disver-e3684.appspot.com/o/black-marker.png?alt=media&token=10329174-cc3b-4dea-8b34-348bf97033b3",
			scaledSize: new this.props.google.maps.Size(18, 24),
		};
		const icon_red = {
			url: "https://firebasestorage.googleapis.com/v0/b/disver-e3684.appspot.com/o/red-marker.png?alt=media&token=841c9a0f-fcef-4b6d-9de6-0d77cc7da392",
			scaledSize: new this.props.google.maps.Size(18, 24),
		};
		
		const markers = this.state.restos.map(resto => {
			return(
				<Marker 
					key={resto.id}
					keyProp={resto.id}
					onClick={this.onMarkerClick} 
					name={resto.name} 
					icon={(resto.id === this.state.currentMarker) ? icon_black : icon_red}
					description={resto.info}
					position={{ lat: resto.latln, lng: resto.lonln }}
				/>
			);
		});

		const restos = this.state.restos.map(resto => {
			return(
				<li key={resto.id} onMouseEnter={() => this.zoomToMarker(resto.latln, resto.lonln, resto.id)} onMouseLeave={() => this.zoomToDefault()}>
					<Link to={{
						pathname: '/resto/' + resto.slug, 
						state: { current_resto: resto}
					}}>
						<div className="resto-cover" style={{backgroundImage: `url(${resto.cover})`}}></div>
						<div className="resto-info">
							<h4>{resto.type}</h4>
							<h3>{resto.name}</h3>
							<small>{resto.address}</small>
						</div>
					</Link>
				</li>
			);
		});

		return(
			<div className="map-wrapper">
				<Map 
					ref="map"
					class="test"
					google={this.props.google}	
					zoom={this.state.mapZoom} 
					style={mapStyles} 
					styles={snazzy}
					initialCenter={{lat: 40.737355, lng: -73.992580}}
					center={this.state.mapCenter}
				>
					
					{ markers }

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
					<h1>Find spots near you</h1>
					<ul className="resto-cover-list">
						{ restos }
					</ul>
				</div>
			</div>
		);
	}
}

export default GoogleApiWrapper(mapConfig.mapConfig[0])(Destination);