import React from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../firebase';

const logOutUser = () => {
	firebase.auth().signOut()
		.then(window.location = "/");
}

const Logout = () => (
	<a href="#!" onClick={logOutUser}>Logout</a>
);

export default Logout;