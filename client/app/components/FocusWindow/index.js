import React from 'react';
import '../styles.scss';
import FWindowStore from '../../stores/FWindowStore';
import FWindowActions from '../../actions/FWindowActions';
import LoadOptions from './LoadOptions';
import Save from './Save';

export default class FocusWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: FWindowStore.isShowing(),
            content: FWindowStore.getContent(),
        };
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

    clickUnderlay() {
        FWindowActions.fWindowHide();
    }

    render(){
        const visibility = this.state.show ? 'show' : '';
        let content = < div />;
        if(this.state.content == 'LOAD_OPTIONS'){
            content = < LoadOptions />;
        } else if(this.state.content == 'SAVE'){
            content = < Save />;
        }

        console.log(this.state.content);
        return(
            <div>
                <div className={'underlay '+visibility} onClick={()=>this.clickUnderlay()} />
                <div className={'content ' + visibility} >
                    { content }
                </div>
            </div>
        );
    }
}
