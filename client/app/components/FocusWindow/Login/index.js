import React from 'react';
import axios from 'axios';
import UserStore from '../../../stores/UserStore';
import UserActions from '../../../actions/UserActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';
import '../../skeleton.css'

export default class Login extends React.Component {


    signIn() {
        var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		axios.defaults.withCredentials = true;

		//Submit a login request to server
		axios.post(process.env.USER_REGISTER, {
			logemail: email,
			logpassword: password,
		})
			.then(response => {
                console.log(response);
				UserActions.userLogin(response.data);
                if (response.data){
                    FWindowActions.fWindowHide();
                }
			})
			.catch(error => {
				console.log(error);
                window.alert("Wrong username or password.")
			});

    }

    render(){
        return(
            <div>
                <div className='header'>Sign in</div>
                <div style={{margin: '10px'}}>


                    <label htmlFor="EmailInput">Email</label>
                    <input ref="email" className="u-full-width" type="email" placeholder="email" id="email"/>


                    <label htmlFor="exampleEmailInput">Password</label>
                    <input ref="password" className="u-full-width" type="password" placeholder="password" id="password"/>

                    <button className="button-primary mid" onClick={this.signIn}>Sign in</button>
                </div>
            </div>
        );
    }
}
