import React from 'react';
import './SideBar.css';

export default class SlideButton extends React.Component {
	
	render(){
		return(
			<div 
				className="slidebutton" 
				onClick={() => this.props.onClick()}
			/>
		);
	}
}
