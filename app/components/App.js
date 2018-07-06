import React from 'react';
import SideBar from './SideBar';
import Wall from './Wall';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Wall />
				<SideBar />
			</div>
		);

	}
}
