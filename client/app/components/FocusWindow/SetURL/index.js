import React from 'react';
import WallStore from '../../../stores/WallStore';
import UserStore from '../../../stores/UserStore';
import WallActions from '../../../actions/WallActions';
import FWindowActions from '../../../actions/FWindowActions';
import axios from 'axios';
import '../../styles.scss';
import '../../skeleton.css';

export default class SetURL extends React.Component {

    submit(){
        //WallActions.wallSetUrl(document.getElementById('seturl').value);
        axios.defaults.withCredentials = true;
        const saveData = {
            author: UserStore.getUser().username,
            collaborators: [UserStore.getUser().username],
            items: WallStore.getItems(),
        };

        saveData.items.url = document.getElementById('seturl').value
        WallActions.wallLoad(saveData.items);

        axios.post(process.env.WALL_SAVE, saveData)
            .then(response => {
                console.log(response);
                FWindowActions.fWindowHide();
            })
            .catch(err => {
                console.log(err);
            });
        FWindowActions.fWindowHide();
    }


    render(){
        return(
            <div>
                <div className='header'>Set URL:</div>
                <div style={{margin: '10px'}}>


                    <label htmlFor="EmailInput">https://postra.com/</label>
                    <input refs="seturl" className="u-full-width" type="text" placeholder="name" id="seturl"
                        defaultValue={WallStore.getItems().url}
                    />


                    <button className="button-primary mid" onClick={this.submit}>submit</button>
                </div>
            </div>
        );
    }
}
