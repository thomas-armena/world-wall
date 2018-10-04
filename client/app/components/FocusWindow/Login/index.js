import React from 'react';
import axios from 'axios';
import UserStore from '../../../stores/UserStore';
import UserActions from '../../../actions/UserActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';

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
		axios.post('http://localhost:8000/', {
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
                    <form style={{textAlign:'center'}}>
                        <div>Email: </div>
                        <input style={{padding: '5px 10px',width: '200px'}} type='text' id='email' />
                        <div>Password: </div>
                        <input style={{padding: '5px 10px',width: '200px'}} type='text' id='password' />
                    </form>
                    <div onClick={()=>this.handleSubmit()} className='submit'>Submit</div>
                </div>
            </div>
        );
    }
}
