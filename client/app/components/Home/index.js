import React from 'react';
import '../styles.scss';
import '../skeleton.css';
import axios from 'axios';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';



export default class Home extends React.Component {

    signUp() {
		axios.defaults.withCredentials = true;

		var email = document.getElementById('home-email').value;
		var username = document.getElementById('home-username').value;
		var password = document.getElementById('home-password').value;
		var passwordConf = document.getElementById('home-passwordConf').value;
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

    signIn() {
		var email = document.getElementById('home-logemail').value;
		var password = document.getElementById('home-logpassword').value;
		axios.defaults.withCredentials = true;

		//Submit a login request to server
		axios.post(process.env.USER_REGISTER, {
			logemail: email,
			logpassword: password,
		})
			.then(response => {
				UserActions.userLogin(response.data);

			})
			.catch(error => {
				console.log(error);
                window.alert("Wrong username or password.")
			});
	}

    render(){
        return(
            <div className='home row'>


                <div className='home-splash-content seven columns'>
                </div>



                <div className='home-login-content five columns'>
                    <h3>Register</h3>

                    <div className='row'>
                        <div className="six columns">
                          <label htmlFor="home-email">Email</label>
                          <input className="u-full-width" type="email" placeholder="email" id="home-email"/>
                        </div>
                        <div className="six columns">
                          <label htmlFor="home-username">Username</label>
                          <input className="u-full-width" type="email" placeholder="username" id="home-username"/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="six columns">
                          <label htmlFor="home-password">Password</label>
                          <input className="u-full-width" type="password" placeholder="password" id="home-password"/>
                        </div>
                        <div className="six columns">
                          <label htmlFor="home-passwordConf">Confirm Password</label>
                          <input className="u-full-width" type="password" placeholder="confirm password" id="home-passwordConf"/>
                        </div>
                    </div>

                    <button className="button-primary" onClick={this.signUp}>Sign up</button>

                    <hr />
                    <h3>Sign in</h3>

                    <div className='row'>
                        <div className="six columns">
                          <label htmlFor="home-logemail">Email</label>
                          <input className="u-full-width" type="email" placeholder="email" id="home-logemail"/>
                        </div>
                        <div className="six columns">
                          <label htmlFor="home-logpassword">Password</label>
                          <input className="u-full-width" type="password" placeholder="confirm password" id="home-logpassword"/>
                        </div>
                    </div>

                    <button className="button-primary" onClick={this.signIn}>Sign in</button>
                </div>
            </div>
        );
    }

}
