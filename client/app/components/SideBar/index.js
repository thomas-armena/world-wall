import React from 'react';
import './SideBar.css';
import SlideButton from './SlideButton';
import Selector from './Selector';
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
				<div className="sidebar-content">
					<Selector />
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector></Selector>
					<Selector />
				</div>
				<div className="sidebar-ext">
					<SlideButton onClick={()=>this.slide()} />
				</div>
			</div>
			
		);
	}
}