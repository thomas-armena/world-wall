
import React from 'react';
import './styles.css';
import FWindowStore from '../../stores/FWindowStore';
import FWindowActions from '../../actions/FWindowActions';
import LoadOptions from '../LoadOptions';
export default class FocusWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: FWindowStore.isShowing(),
            content: FWindowStore.getContent(),
        }
    }

    componentDidMount(){
        FWindowStore.on('FWINDOW_UPDATE', ()=>this.handleUpdate());
    }

    componentWillUnmount(){
        FWindowStore.removeListener('FWINDOW_UPDATE', ()=>this.handleUpdate());
    }

    handleUpdate(){
        this.setState({
            show: FWindowStore.isShowing(),
            content: FWindowStore.getContent(),
        });
    }

    render(){
        const visibility = this.state.show ? 'show' : '';
        return(
            <div className={'underlay '+visibility} >
                <div className='content'>
                    <LoadOptions />
                </div>
            </div>
        );
    }
}


