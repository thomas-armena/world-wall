import React from 'react';
import './styles.css';
import WallStore from '../../stores/WallStore';
import WallActions from '../../actions/WallActions';
import UserStore from '../../stores/UserStore';
import axios from 'axios';
import FWindowActions from '../../actions/FWindowActions';
import LoadOptions from '../LoadOptions';

export default class ProjectDropdown extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title: WallStore.items.title,
        }
    }

    componentDidMount(){
        WallStore.on('UPDATE', ()=>this.handleUpdate());   
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', ()=>this.handleUpdate());   
    }

    handleUpdate(){
        this.setState({title: WallStore.items.title});
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

		axios.defaults.withCredentials = true;
        const saveData = {
            author: UserStore.getUser().username,
            collaborators: [UserStore.getUser().username],
            items: WallStore.getItems(),
        }

        saveData.items.title = window.prompt('Save as: ', saveData.items.title);
        WallActions.wallLoad(saveData.items);

        axios.post('http://localhost:8000/save', saveData)
            .then(response => {
                console.log(response);
                window.alert('saved');
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRename(){
        const newName = window.prompt('Please enter new name: ', this.state.title);
        WallActions.wallRename(newName);
        
    }

    render() {

        return (
            <div className="menu-wrapper">
                <button onClick={()=>this.handleClick()} className="title">{this.state.title}</button>
                <div className="menu-content">
                    <button onClick={()=>this.handleLoad()}>Load</button>
                    <button onClick={()=>this.handleSave()}>Save</button>
                    <button onClick={()=>this.handleRename()}>Rename</button>
                </div>
            </div>
        );
    }
}
