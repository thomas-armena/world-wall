import React from 'react';
import './SideBar/SideBar.css';
import SlideButton from './SideBar/SlideButton';
export default class SideBar extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			out: true
		};
	}

	slide() {
		this.setState({out: !this.state.out});
	}


	render() {
		let slideclass = this.state.out? "sidebar-out" : "sidebar-in";
		return (
			<div className={"sidebar "+slideclass}>
				<SlideButton onClick={()=>this.slide()} />
			</div>
			
		);
	}
}
