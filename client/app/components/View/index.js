import React from 'react';
import axios from 'axios';
import Wall from '../Wall';
import WallActions from '../../actions/WallActions';

export default class View extends React.Component {

	constructor(props){
		super(props);
 		this.state= {
			message: 'No message'
		}

	}

	componentDidMount() {
		console.log('id:');
		console.log(this.props.match.params.id);

		axios.defaults.withCredentials = true;
        axios.post(process.env.WALL_LOAD, { url: this.props.match.params.id })
            .then(response=>{
                console.log(response.data)
				if(response.data[0]){
					WallActions.wallLoad(response.data[0].wall);
				}

            })
            .catch(error=>{
                console.log(error);
            });
	}

	render() {
		return(
			<div>
				<Wall edit={false}/>
			</div>

		);
	}
}
