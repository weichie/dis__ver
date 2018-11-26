import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";

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
		location: 'East Village',
		slug: 'soup-and-burger'
	},{
		id: 2,
		city_id: 1,
		name: 'Blockheads',
		cover: img_blockheadsbg,
		location: 'East Village',
		slug: 'blockheads'
	},{
		id: 3,
		city_id: 1,
		name: 'Intermezzo',
		cover: img_intermezzo,
		location: 'Chelsea',
		slug: 'intermezzo'
	},{
		id: 4,
		city_id: 1,
		name: 'Wonton Noodle Garden',
		cover: img_wonton,
		location: 'Chinatown',
		slug: 'wonton-noodle-garden'
	},{
		id: 5,
		city_id: 1,
		name: 'Brother Jimmy\'s BBQ',
		cover: img_jimmys,
		location: 'Hells Kitchen',
		slug: 'brother-jimmys-bbq'
	},{
		id: 6,
		city_id: 2,
		name: 'Roberta\'s Pizza',
		cover: img_robertas,
		location: 'East Village',
		slug: 'robertas-pizza'
	}
];

class Main extends React.Component{
	render(){
		const current_city = this.props.cities[this.props.current - 1];
		const restos = gems.map(resto => {
			if (resto.city_id === this.props.current) {
				return <li key={resto.id} style={{backgroundImage: `url(${resto.cover})`}}>
					<Link to={`/resto/${resto.slug}`}>
						<div className="content-panel">
							<small>{resto.location}</small>
							<strong>{resto.name}</strong>
						</div>
						<div className="bottom-gradient"></div>
					</Link>
				</li>
			}
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