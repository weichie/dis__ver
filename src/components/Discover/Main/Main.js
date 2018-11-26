import React from 'react';

import './Main.css';
import img_soupbg from'./covers/soupnbg.jpg';
import img_blockheadsbg from'./covers/blockheadsbg.jpg';
import img_robertas from './covers/robertasbg.jpg';
import img_intermezzo from './covers/intermezzobg.jpg';
import img_wonton from './covers/wontonbg.jpg';
import img_jimmys from './covers/jimmysbbq.jpg';

var gems = [
	{
		id: 1,
		city_id: 1,
		name: 'Soup & Burger',
		cover: img_soupbg,
		location: 'East Village'
	},{
		id: 2,
		city_id: 1,
		name: 'Blockheads',
		cover: img_blockheadsbg,
		location: 'East Village'
	},{
		id: 3,
		city_id: 1,
		name: 'Intermezzo',
		cover: img_intermezzo,
		location: 'Chelsea'
	},{
		id: 4,
		city_id: 1,
		name: 'Wonton Noodle Garden',
		cover: img_wonton,
		location: 'Chinatown'
	},{
		id: 5,
		city_id: 1,
		name: 'Brother Jimmy\'s BBQ',
		cover: img_jimmys,
		location: 'Hells Kitchen'
	},{
		id: 6,
		city_id: 2,
		name: 'Roberta\'s Pizza',
		cover: img_robertas,
		location: 'East Village'
	}
];

class Main extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const current_city = this.props.cities[this.props.current - 1];
		const restos = gems.map(resto => {
			return (resto.city_id === this.props.current) ?
				<li key={resto.id} style={{backgroundImage: `url(${resto.cover})`}}>
					<div className="content-panel">
						<small>{resto.location}</small>
						<strong>{resto.name}</strong>
					</div>
					<div className="bottom-gradient"></div>
				</li>
			: '';
		});

		return(
			<div className="discover-main-wrapper">
				<div className="discover--info">
					<h4>Discover</h4>
					<h1>{current_city.name}</h1>
					<p>{current_city.info}</p>
				</div>
				<div className="discover--list">
					<ul className="resto-list">
						{restos}
					</ul>
				</div>
			</div>
		);
	}
}

export default Main;

// <div className="discover--list">
// 	<ul className="resto-list">
// 		{restos}
// 	</ul>
// </div>