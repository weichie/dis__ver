import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import mapConfig from '../Destination/apiKeys.js';
import './Resto.css';

const snazzy = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}];

class Resto extends React.Component{
	constructor(props){
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render(){
		const resto 		= this.props.location.state.current_resto;
		const resto_link 	= encodeURIComponent(resto.address);
		const mapStyles 	= {marginTop: '35px',marginBottom:'100px',width: '100%',height: '300px'}
		const icon_red 	= {
			url: "https://firebasestorage.googleapis.com/v0/b/disver-e3684.appspot.com/o/red-marker.png?alt=media&token=841c9a0f-fcef-4b6d-9de6-0d77cc7da392",
			scaledSize: new this.props.google.maps.Size(18, 24),
		};

		return(
			<div className="resto-wrapper">
				<div className="resto--cover" style={{backgroundImage: `url('${resto.coverUrl}')`}}>
					
				</div>
				<div className="resto--info">
					<div className="inner">
						<h4>{resto.type}</h4>
						<h1>{resto.name}</h1>
						<a className="direction-link" href={`https://www.google.com/maps/dir/?api=1&query=${resto_link}`}><small>{resto.address}</small></a>
						<p>{resto.info}</p>

						<a className="goback-link" onClick={this.goBack}>Back to overview</a>

						<Map
							ref="map"
							google={this.props.google}
							zoom={14}
							style={mapStyles}
							styles={snazzy}
							initialCenter={{lat: resto.latln, lng: resto.lonln}}
							disableDefaultUI={true}
						>
							<Marker 
								key="restoLocation"
								icon={icon_red}
								position={{lat:resto.latln,lng:resto.lonln}}
							/>
						</Map>
					</div>
				</div>
			</div>
		);
	}
}

export default GoogleApiWrapper(mapConfig.mapConfig[0])(Resto);