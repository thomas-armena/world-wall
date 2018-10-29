import React from 'react';
import WallStore from '../../../stores/WallStore';
import WallActions from '../../../actions/WallActions';
import FWindowActions from '../../../actions/FWindowActions';
import '../../styles.scss';
import '../../skeleton.css';

export default class Rename extends React.Component {

    submit(){
        WallActions.wallRename(document.getElementById('rename').value);
        FWindowActions.fWindowHide();
    }


    render(){
        return(
            <div>
                <div className='header'>Rename</div>
                <div style={{margin: '10px'}}>


                    <label htmlFor="EmailInput">New name</label>
                    <input refs="rename" className="u-full-width" type="text" placeholder="name" id="rename"
                        defaultValue={WallStore.getItems().title}
                    />


                    <button className="button-primary mid" onClick={this.submit}>submit</button>
                </div>
            </div>
        );
    }
}
