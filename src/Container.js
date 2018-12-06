import React from 'react';

class Container extends React.Component{
	render(){
		const styles = {
			width: '100vw',
			height: '100vh'
		}
		return(
			<div style={styles}>
				<Map google={this.props.google} />
			</div>
		);
	}
}

export default GoogleApiComponent({
	apiKey: 'AIzaSyAqyNvjD0kNMcP0uD0c1AHeOVWoKnBf_Ps'
})(Container);