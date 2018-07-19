import React from 'react';
import axios from 'axios';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: UserStore.getUser(),
		};
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
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		axios.defaults.withCredentials = true;

		//Submit a login request to server
		axios.post('http://localhost:8000/', {
			logemail: email,
			logpassword: password,
		})
			.then(response => {
				UserActions.userLogin(response.data);

			})
			.catch(error => {
				console.log(error);
			});
	}

	logout(){
		axios.defaults.withCredentials = true;
		axios.get('http://localhost:8000/logout')
			.then(response => {
				UserActions.userLogout(response.data);
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
				<h1>Login</h1>
				<div>
					Email: <input type="text" id="email" />
					<br />
					Password: <input type="text" id="password" />
					<br />
					<button type="button" onClick={()=>this.submit()}>Submit</button>						
					<button type="button" onClick={()=>this.logout()}>Logout</button>						
					<br />
					<div>{message}</div>
				</div>
			</div>
		);
	}
}
