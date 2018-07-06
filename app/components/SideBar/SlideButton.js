import React from 'react';
import './SideBar.css';

export default class SlideButton extends React.Component {
	
	render(){
		return(
			<button 
				className="slidebutton" 
				onClick={() => this.props.onClick()}
			/>
		);
	}
}
