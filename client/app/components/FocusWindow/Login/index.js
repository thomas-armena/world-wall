import React from 'react';
import axios from 'axios';
import UserStore from '../../../stores/UserStore';
import UserActions from '../../../actions/UserActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';
import '../../skeleton.css'

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleSubmit() {
        var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		axios.defaults.withCredentials = true;

		//Submit a login request to server
		axios.post(process.env.USER_REGISTER, {
			logemail: email,
			logpassword: password,
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
                <div className='header'>Sign in</div>
                <div style={{margin: '10px'}}>


                    <label for="EmailInput">Email</label>
                    <input className="u-full-width" type="email" placeholder="email" id="email"/>


                    <label for="exampleEmailInput">Password</label>
                    <input className="u-full-width" type="password" placeholder="password" id="password"/>

                    <button class="button-primary mid" onClick={this.signIn}>Sign in</button>
                </div>
            </div>
        );
    }
}
