import React from 'react';
import './NavBar/NavBar.css';

export default class NavBar extends React.Component {
	
	render() {
		return(
			<div className="nav-bar">
				<h1> world wall </h1>
				<ul>
					<li><a href="">home</a></li>
					<li><a href="">create</a></li>
					<li><a href="">about</a></li>
				</ul>
			</div>
		);
	}	

}
