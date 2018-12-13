import React from 'react';

import './Search.css';

const Search = props => (
	<div className="search--wrapper">
		<form className="searchform">
			<input 
				name="search"
				placeholder="Seach restaurant or kitchen type..."
				onChange={props.handleSearch}
				value={props.query}
			/>
		</form>
		{props.searchActive && 
			<div className="searchresults">
				<a className="dif-link" onClick={props.cancelSearch}>Cancel</a>
				<strong>Results for "<span>{props.query}</span>"</strong>
			</div>
		}
	</div>
);

export default Search;