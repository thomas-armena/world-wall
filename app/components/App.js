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
		return (
			<Router>
				<div>
					<NavBar >
						<h1> world wall </h1>
						<ul>
							<li><Link className="link" to="/">home</Link></li>
							<li><Link className="link" to="/create">create</Link></li>
							<li><Link className="link" to="/view">view</Link></li>
							<li><Link className="link" to="/about">about</Link></li>
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




	
