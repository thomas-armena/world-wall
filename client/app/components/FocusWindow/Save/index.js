import React from 'react';
import axios from 'axios';
import UserStore from '../../../stores/UserStore';
import WallStore from '../../../stores/WallStore';
import WallActions from '../../../actions/WallActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';

export default class Save extends React.Component {


    handleSubmit() {
        
        axios.defaults.withCredentials = true;
        const saveData = {
            author: UserStore.getUser().username,
            collaborators: [UserStore.getUser().username],
            items: WallStore.getItems(),
        };

        saveData.items.title = document.getElementById('savename').value;
        WallActions.wallLoad(saveData.items);

        axios.post(process.env.WALL_SAVE, saveData)
            .then(response => {
                console.log(response);
                FWindowActions.fWindowHide();
            })
            .catch(err => {
                console.log(err);
            });

    }

    render(){
        console.log('render')
        return(
            <div>
                <div className='header'>Save</div>
                <input type='text' id='savename' refs="input" defaultValue={WallStore.getItems().title}/>
                <div onClick={()=>this.handleSubmit()} className='submit'>Submit</div>
            </div>
        );
    }
}
