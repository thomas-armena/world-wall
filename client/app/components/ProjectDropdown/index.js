import React from 'react';
import '../styles.scss';
import WallStore from '../../stores/WallStore';
import WallActions from '../../actions/WallActions';
import UserStore from '../../stores/UserStore';
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
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8000/load', { author: UserStore.getUser().username })
            .then(response=>{
                WallStore.setLoadData(response.data);
                FWindowActions.fWindowContent('LOAD_OPTIONS');
                FWindowActions.fWindowShow();
            })
            .catch(error=>{
                console.log(error);
            });
    }

    handleSave(){
        FWindowActions.fWindowContent('SAVE');
        FWindowActions.fWindowShow();
    }

    handleRename(){
        const newName = window.prompt('Please enter new name: ', this.state.title);
        WallActions.wallRename(newName);

    }

    render() {
        const activatedclass = this.state.activated ? 'activate' : '';
        return (
            <div className="menu-wrapper">
                <div className={'option-dropdown load '+activatedclass} onClick={()=>this.handleLoad()}>Load</div>
                <div className={'option-dropdown save '+activatedclass} onClick={()=>this.handleSave()}>Save</div>
                <div className={'option-dropdown rename '+activatedclass} onClick={()=>this.handleRename()}>Rename</div>
                <div onClick={()=>this.handleClick()} className="title">{this.state.title}</div>
            </div>
        );
    }
}
