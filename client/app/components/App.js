import React from 'react';
import SideBar from './SideBar';
import ProjectDropdown from './ProjectDropdown';
import Wall from './Wall';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import FocusWindow from './FocusWindow';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import UserActions from '../actions/UserActions';

export default class App extends React.Component {
	
	componentWillMount() {

		//login when application starts
		axios.defaults.withCredentials = true;
		axios.get('http://localhost:8000/profile')
			.then(response => {
				UserActions.userLogin(response.data);
			})
			.catch(error => {
				console.log(error);
			});

        //
	}

	render() {

		const Editor = () => (
			<div>
				<SideBar />
				<Wall edit={true} />
                <ProjectDropdown />
			</div>
		);

        const View = () => (
            <div>
                <Wall edit={false}/>
            </div>
        );

		const Home = () => (
			<div>Home</div>
		);


		const About = () => (
			<div>About</div>
		);
		

		const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
		  	<Route
		    		path={to}
		    		exact={activeOnlyWhenExact}
		    		children={({ match }) => (
		      		<div>
					<Link className={match ? "link activated" : "link"} to={to}>{label}</Link>
		      		</div>
		    )}
		  />
		);
		return (
			<Router>
				<div>
					<NavBar >
						<h1> world wall </h1>
						<ul>
							<li><MenuLink activeOnlyWhenExact={true} to="/" label="Home" /></li>
							<li><MenuLink to="/create" label="Create" /></li>
							<li><MenuLink to="/view" label="View" /></li>
							<li><MenuLink to="/about" label="About" /></li>
							<li><MenuLink to="/login" label="Login" /></li>
							<li><MenuLink to="/register" label="Register" /></li>
						</ul>
					</ NavBar>
					<div id="content-wrapper">
						<Route exact path="/" component={Home} />
						<Route path="/create" component={Editor} />
						<Route path="/view" component={View} />
						<Route path="/about" component={About} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
					</div>
                    <FocusWindow />
				</div>
			</Router>
		);

	}
}
