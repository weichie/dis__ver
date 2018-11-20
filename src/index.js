import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from './components/Home/Home';

class App extends React.Component {  
	render(){
		return(
			<div className="app">
				<Home />
			</div>
		);
	}
}


// ========================================
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
