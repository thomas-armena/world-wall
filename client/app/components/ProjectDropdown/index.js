import React from 'react';
import '../styles.scss';
import WallStore from '../../stores/WallStore';
import UserStore from '../../stores/UserStore';
import WallActions from '../../actions/WallActions';
import axios from 'axios';
import FWindowActions from '../../actions/FWindowActions';

export default class ProjectDropdown extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: WallStore.items.title,
            activated: false,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        WallStore.on('UPDATE', this.handleUpdate);
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', this.handleUpdate);
    }

    handleUpdate(){
        this.setState({title: WallStore.items.title});
    }

    handleClick(){
        this.setState({activated: !this.state.activated});
    }

    handleLoad(){
        if (UserStore.getUser() == null){
            window.alert('Please register or sign in.');
            return;
        }
        axios.defaults.withCredentials = true;
        axios.post(process.env.WALL_LOAD, { author: UserStore.getUser().username })
            .then(response=>{
                console.log(response.data)
                WallStore.setLoadData(response.data);
                FWindowActions.fWindowContent('LOAD_OPTIONS');
                FWindowActions.fWindowShow();
            })
            .catch(error=>{
                console.log(error);
            });
    }

    handleSave(){
        if (UserStore.getUser() == null){
            window.alert('Please register or sign in.');
            return;
        }
        FWindowActions.fWindowContent('SAVE');
        FWindowActions.fWindowShow();
    }

    handleRename(){
        FWindowActions.fWindowContent('RENAME');
        FWindowActions.fWindowShow();
    }

    handleSetUrl(){
        if (UserStore.getUser() == null){
            window.alert('Please register or sign in.');
            return;
        }
        FWindowActions.fWindowContent('SET_URL');
        FWindowActions.fWindowShow();
    }

    handleGetUrl(){
        if (UserStore.getUser() == null){
            window.alert('Please register or sign in.');
            return;
        }
        FWindowActions.fWindowContent('GET_URL');
        FWindowActions.fWindowShow();
    }

    render() {
        const activatedclass = this.state.activated ? 'activate' : '';
        return (
            <div className="menu-wrapper">
                <div className={'option-dropdown load '+activatedclass} onClick={()=>this.handleLoad()}>Load</div>
                <div className={'option-dropdown save '+activatedclass} onClick={()=>this.handleSave()}>Save</div>
                <div className={'option-dropdown rename '+activatedclass} onClick={()=>this.handleRename()}>Rename</div>
                <div className={'option-dropdown set-url '+activatedclass} onClick={()=>this.handleSetUrl()}>Set URL</div>
                <div className={'option-dropdown get-url '+activatedclass} onClick={()=>this.handleGetUrl()}>Get Shareable URL</div>
                <div onClick={()=>this.handleClick()} className="title">{this.state.title}</div>
            </div>
        );
    }
}
