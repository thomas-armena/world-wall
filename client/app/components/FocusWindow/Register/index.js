import React from 'react';
import axios from 'axios';
import UserStore from '../../../stores/UserStore';
import UserActions from '../../../actions/UserActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';
import '../../skeleton.css'

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    Register() {
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
                if (response.data){
                    FWindowActions.fWindowHide();
                }
		})
		.catch(error => {
				console.log(error);
		});
	}

    render(){
        return(
            <div>
                <div className='header'>Register</div>
                <div className='focuswindow-content'>


                    <label for="exampleEmailInput">Email</label>
                    <input className="u-full-width" type="email" placeholder="email" id="email"/>

                    <label for="exampleEmailInput">Username</label>
                    <input className="u-full-width" type="email" placeholder="username" id="username"/>

                    <label for="exampleEmailInput">Password</label>
                    <input className="u-full-width" type="password" placeholder="password" id="password"/>

                    <label for="exampleEmailInput">Confirm Password</label>
                    <input className="u-full-width" type="password" placeholder="confirm password" id="passwordConf"/>

                    <button class="button-primary mid" onClick={this.Register}>Register</button>
                </div>
            </div>
        );
    }
}
