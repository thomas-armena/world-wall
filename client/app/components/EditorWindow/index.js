import React from 'react';
import '../styles.scss';
import EditTextBox from './EditTextBox';
import WallStore from '../../stores/WallStore';

export default class EditorWindow extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            content:<div/>
        }
    }

    componentDidMount(){
        WallStore.on('UPDATE', ()=>this.handleUpdate());
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', ()=>this.handleUpdate());
    }

    handleUpdate(){
        if(WallStore.getItems()['item_'+WallStore.getSelectedId()]){
            switch(WallStore.getItems()['item_'+WallStore.getSelectedId()].itemType){
                case 'TEXT_BOX':
                    this.setState({content:<EditTextBox/>})
                    break;
                default:
                    this.setState({content:<div/>})
                    break;
            }
        } else {
            this.setState({content:<div/>})
        }

    }

    render(){
        return(
            <div className='window-editor'>
                {this.state.content}
            </div>
        )
    }

}
