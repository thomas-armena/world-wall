import React from 'react';
import axios from 'axios';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

export default class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			user: UserStore.getUser(),
		}
	}

	componentWillMount() {
		UserStore.on('CHANGE', ()=>this.callback());
	}

	callback() {
		this.setState({ user: UserStore.getUser() });
	}

	componentWillUnmount() {
		UserStore.removeListener('CHANGE', this.callback);
	}

	submit() {
		axios.defaults.withCredentials = true;

		var email = document.getElementById('email').value;
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var passwordConf = document.getElementById('passwordConf').value;
		axios.post(process.env.USER_REGISTER, {
			email: email,
			username: username,
			password: password,
			passwordConf: passwordConf

		})
		.then(response => {
				UserActions.userLogin(response.data);
		})
		.catch(error => {
				console.log(error);
		});
	}

	render() {
		if (this.state.user == null){
			var message = "Not signed in.";
		} else {
			var message = "Currently logged in as: "+this.state.user.username
		}

		return(
			<div>
				<h1>Register</h1>
				<div>
				<label for="exampleEmailInput">Email</label>
				<input className="u-full-width" type="email" placeholder="email" id="home-email"/>

				<label for="exampleEmailInput">Username</label>
				<input className="u-full-width" type="email" placeholder="username" id="home-username"/>

				<label for="exampleEmailInput">Password</label>
				<input className="u-full-width" type="password" placeholder="password" id="home-password"/>

				<label for="exampleEmailInput">Confirm Password</label>
				<input className="u-full-width" type="password" placeholder="confirm password" id="home-passwordConf"/>

				</div>
			</div>
		);
	}
}
