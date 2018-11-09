import React from 'react';
import WallStore from '../../../stores/WallStore';
import UserStore from '../../../stores/UserStore';
import WallActions from '../../../actions/WallActions';
import FWindowActions from '../../../actions/FWindowActions';
import axios from 'axios';
import '../../styles.scss';
import '../../skeleton.css';

export default class GetURL extends React.Component {

    constructor(props){
        super(props);
        this.state = { url: '' };

    }

    componentDidMount(){
        const saveData = {
            author: UserStore.getUser().username,
            collaborators: [UserStore.getUser().username],
            items: WallStore.getItems(),
        };

        axios.defaults.withCredentials = true;
        axios.post(process.env.WALL_LOAD, saveData)
            .then(response => {
                console.log(response.data)
                if(response.data != '')
                    this.setState({url: 'http://postra.com/view/'+response.data})
                else
                    this.setState({url: 'No URL has been set yet'})
                
            })
            .catch(err => {
                window.alert(err);
            });

    }


    render(){
        return(
            <div>
                <div className='header'>Shareable URL:</div>
                <div style={{margin: '10px'}}>

                    <input refs="geturl" className="u-full-width" type="text" placeholder="name" id="geturl"
                        value={this.state.url}
                    />

                </div>
            </div>
        );
    }
}
