import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: "John Doe",
		};
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
		var password = document.getElementById('password').value;
		axios.post('http://localhost:8000/', {
			logemail: email,
			logpassword: password,
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
				<h1>Login</h1>
				<div>
					Email: <input type="text" id="email" />
					<br />
					Password: <input type="text" id="password" />
					<br />
					<button type="button" onClick={()=>this.submit()}>Submit</button>						
					<br />
					<div>{"Currently logged in as: "+this.state.user}</div>
				</div>
			</div>
		);
	}
}
