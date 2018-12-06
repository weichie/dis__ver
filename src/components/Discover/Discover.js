import React from 'react';
import firebase from '../../firebase.js';

import './Discover.css';

import Sidenav from './Sidenav/Sidenav';
import Main from './Main/Main';

class Discover extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cities: [],
			restos: []
		}
		this.updateCurrent = this.updateCurrent.bind(this);
	}

	updateCurrent(id, cover, name, info){
		this.setState({
			currentCity: id,
			currentCover: cover,
			currentName: name,
			currentInfo: info
		});
	}

	componentDidMount(){
		const cityRef = firebase.database().ref('cities');
		const restoRef = firebase.database().ref('restos');
		cityRef.on('value', (snapshot) => {
			let cities = snapshot.val();
			let newState = [];
			let counter = 0;
			for (let city in cities){
				newState.push({
					id: cities[city].cityId,
					name: cities[city].name,
					info: cities[city].info,
					cover: cities[city].cover
				});
				if(counter === 0){
					this.setState({
						currentCity: cities[city].cityId,
						currentName: cities[city].name,
						currentCover: cities[city].cover,
						currentInfo: cities[city].info
					});
				}
				counter++;
			}
			this.setState({
				cities: newState
			});
		});

		restoRef.on('value', (snapshot) => {
			let restos = snapshot.val();
			let restoState = [];
			for (let resto in restos){
				restoState.push({
					id: resto,
					slug: restos[resto].slug,
					cover: restos[resto].cover,
					name: restos[resto].name,
					info: restos[resto].info,
					city: restos[resto].city,
					location: restos[resto].location,
					latln: restos[resto].latln,
					lonln: restos[resto].lonln
				});
			}
			this.setState({
				restos: restoState
			})
		})
	}

	render(){
		return(
			<div className="discover-wrapper" style={{backgroundImage: `url(${this.state.currentCover})`}}>
				<div className="dark-filter med"></div>
				<Sidenav 
					cities={this.state.cities} 
					current={this.state.currentCity} 
					currentHandler={this.updateCurrent} 
				/>
				{this.state.currentCity &&
					<Main 
						current_id={this.state.currentCity}
						current_name={this.state.currentName}
						current_info={this.state.currentInfo}
						restos={this.state.restos}
					/>
				}
			</div>
		);
	}
}

export default Discover;