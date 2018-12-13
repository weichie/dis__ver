import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";

import Search from '../Search/Search';
import './Main.css';


class Main extends React.Component{
	render(){
		const restos = this.props.restos.map(resto => {
			if (resto.city === this.props.current_id) {
				return <li key={resto.id} style={{backgroundImage: `url(${resto.coverUrl})`}}>
					<Link 
						to={{
							pathname: '/resto/' + resto.slug, 
							state: { current_resto: resto }
						}}>
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
					{!this.props.searchActive && 
						<div className="main-wrapper">
							<h4>Discover</h4>
							<h1>{this.props.current_name}</h1>
							<p>{this.props.current_info}</p>
						</div>
					}

					<Search 
						searchActive={this.props.searchActive}
						handleSearch={this.props.handleSearch} 
						query={this.props.query}
					/>
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