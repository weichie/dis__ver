import React from 'react';
import './Login.css';

class Login extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="login-section">
				{this.props.currentLogged ? <a href="#!" onClick={this.props.logout}>Logout</a> : <a href="#!" onClick={this.props.login}>Log In</a>}
			</div>
		);
	}
}

export default Login;