import React from 'react';
import axios from 'axios';

export default class View extends React.Component {

	constructor(props){
		super(props);
 		this.state= {
			message: 'No message'
		}
		
	}

	componentDidMount() {
		axios.get('http://localhost:8000/')
		.then((response) => {
				console.log(response.status);
				console.log(response.data);
				this.setState({message: response.data});
		})
		.catch(function (error) {
				console.log(error);
		});
	}

	render() {
		return(
			<div>
			{this.state.message}
			</div>

		);
	}
}
