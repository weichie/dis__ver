import React from 'react';

import './Discover.css';

import Sidenav from './Sidenav/Sidenav';
import Main from './Main/Main';

import manhattan_bg from'./manhattan_bg.jpg';
import brooklyn_bg from'./brooklyn_bg.jpg';
import queens_bg from'./queens_bg.jpg';
import harlem_bg from'./harlem_bg.jpg';
import bronx_bg from'./bronx_bg.jpg';

var neighborhoods = [{
	id: 1,
	cover: manhattan_bg,
	name: 'Manhattan',
	info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi natus, optio hic autem dolore quod delectus cum corrupti commodi. Voluptate reprehenderit ratione dignissimos perspiciatis a nostrum consequuntur illo pariatur magnam.'
},{
	id: 2,
	cover: brooklyn_bg,
	name: 'Brooklyn',
	info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi natus, optio hic autem dolore quod delectus cum corrupti commodi. Voluptate reprehenderit ratione dignissimos perspiciatis a nostrum consequuntur illo pariatur magnam.'
},{
	id: 3,
	cover: queens_bg,
	name: 'Queens',
	info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi natus, optio hic autem dolore quod delectus cum corrupti commodi. Voluptate reprehenderit ratione dignissimos perspiciatis a nostrum consequuntur illo pariatur magnam.'
},{
	id: 4,
	cover: harlem_bg,
	name: 'Harlem',
	info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi natus, optio hic autem dolore quod delectus cum corrupti commodi. Voluptate reprehenderit ratione dignissimos perspiciatis a nostrum consequuntur illo pariatur magnam.'
},{
	id: 5,
	cover: bronx_bg,
	name: 'The Bronx',
	info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi natus, optio hic autem dolore quod delectus cum corrupti commodi. Voluptate reprehenderit ratione dignissimos perspiciatis a nostrum consequuntur illo pariatur magnam.'
}];

class Discover extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			neighborhoods: neighborhoods,
			currentCity: 1,
			currentCover: manhattan_bg
		}
		this.updateCurrent = this.updateCurrent.bind(this);
	}

	updateCurrent(id){
		this.setState({
			currentCity: id,
			currentCover: neighborhoods[id - 1].cover
		});
	}

	render(){
		return(
			<div className="discover-wrapper" style={{backgroundImage: `url(${this.state.currentCover})`}}>
				<div className="dark-filter med"></div>
				<Sidenav 
					cities={neighborhoods} 
					current={this.state.currentCity} 
					currentHandler={this.updateCurrent} 
				/>
				<Main 
					cities={neighborhoods}
					current={this.state.currentCity}
				/>
			</div>
		);
	}
}

export default Discover;