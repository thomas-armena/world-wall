import React from 'react';
import SideBar from './SideBar';
import Wall from './Wall';
import NavBar from './NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class App extends React.Component {
	render() {

		const Editor = () => (
			<div>
				<SideBar />
				<Wall />
			</div>
		);

		const Home = () => (
			<div>Home</div>
		);

		const View = () => (
			<div>View</div>
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
						</ul>
					</ NavBar>
					<div id="content-wrapper">
						<Route exact path="/" component={Home} />
						<Route path="/create" component={Editor} />
						<Route path="/view" component={View} />
						<Route path="/about" component={About} />
					</div>
				</div>
			</Router>
		);

	}
}




	
