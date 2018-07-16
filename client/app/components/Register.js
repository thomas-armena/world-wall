import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			message: "Please log in",
			user: "John Doe"
		}
	}

	componentDidMount() {
		axios.defaults.withCredentials = true;
		axios.get('http://localhost:8000/profile')
			.then(response => {
				this.setState({user: response.data.username});
			})
			.catch(error => {
				console.log(error);
			});
	}

	submit() {
		axios.defaults.withCredentials = true;

		var email = document.getElementById('email').value;
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var passwordConf = document.getElementById('passwordConf').value;
		axios.post('http://localhost:8000/', {
			email: email,
			username: username,
			password: password,
			passwordConf: passwordConf
			
		})
		.then(response => {
				console.log(response.data);
				this.setState({user: response.data.username});
		})
		.catch(error => {
				console.log(error);
		});
	}

	render() {

		return(
			<div>
				<h1>Register</h1>
				<div>
					Email: <input type="text" id="email"  />
					<br />
					Username: <input type="text" id="username"  />
					<br />
					Password: <input type="text" id="password"  />
					<br />
					Confirm Password: <input type="text" id="passwordConf"  />
					<br />
					<button type="button" onClick={()=>this.submit()}>Submit </button>
					<br />
					<div>{"Currently logged in as: "+this.state.user}</div>
				</div>
			</div>
		);
	}
}
