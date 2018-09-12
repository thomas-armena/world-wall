import React from 'react';
import '../../styles.scss';
import WallStore from '../../../stores/WallStore'


export default class EditTextBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text: WallStore.getItems()['item_'+WallStore.getSelectedId()].text
        }
    }

    componentDidMount(){
        WallStore.on('UPDATE', ()=>this.handleUpdate());
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', ()=>this.handleUpdate());
    }

    handleUpdate(){
        this.setState({
            text: WallStore.getItems()['item_'+WallStore.getSelectedId()].text,
        });
    }

    handleChange(){
        const newText = this.refs.textbox.value;
        WallStore.items['item_'+WallStore.getSelectedId()].text = newText;
        WallStore.emit('UPDATE')
        this.setState({text: newText});
    }

    render(){
        return(
            <div>
                TextBox
                <textarea className='editor-textarea'
                    value={this.state.text}
                    ref='textbox'
                    onChange={()=>this.handleChange()}
                />
            </div>
        )
    }

}
