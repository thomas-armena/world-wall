import React from 'react';
import SideBar from './SideBar';
import Wall from './Wall';
import NavBar from './NavBar';
import './App.css';
export default class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<div id="editor-wrapper">
					<SideBar />
					<Wall />
				</div>
			</div>
		);

	}
}
