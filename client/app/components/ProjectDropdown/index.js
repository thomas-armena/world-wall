import React from 'react';
import './styles.css';
import WallStore from '../../stores/WallStore';
import UserStore from '../../stores/UserStore';
import axios from 'axios';

export default class ProjectDropdown extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title: WallStore.items.title,
        }
    }

    handleLoad(){
        window.alert('try');
        axios.defaults.withCredentials = true; 
        axios.post('http://localhost:8000/load', { author: UserStore.getUser().username })
            .then(response=>{
                console.log(response.data);
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

        axios.post('http://localhost:8000/save', saveData)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        return (
            <div className="menu-wrapper">
                <button onClick={()=>this.handleClick()} className="title">{this.state.title}</button>
                <div className="menu-content">
                    <button onClick={()=>this.handleLoad()}>Load</button>
                    <button onClick={()=>this.handleSave()}>Save</button>
                </div>
            </div>
        );
    }
}
