import React from 'react';
import '../styles.scss';
import EditTextBox from './EditTextBox';
import EditImageBox from './EditImageBox';
import WallStore from '../../stores/WallStore';

export default class EditorWindow extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            content:<div/>
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        WallStore.on('UPDATE', this.handleUpdate);
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', this.handleUpdate);
    }

    handleUpdate(){
        if(WallStore.getItems()['item_'+WallStore.getSelectedId()]){
            switch(WallStore.getItems()['item_'+WallStore.getSelectedId()].itemType){
                case 'TEXT_BOX':
                    this.setState({
                        out: true,
                        content:<EditTextBox/>,
                        header:'Text Box',
                    });
                    break;
                case 'IMAGE_BOX':
                    this.setState({
                        out: true,
                        content:<EditImageBox/>,
                        header: 'Image Box',
                    });
                    break;
                default:
                    this.setState({
                        out: false,
                        content:<div/>,
                        header: ' ',
                    })
                    break;
            }
        } else {
            this.setState({
                out: false,
                content:<div/>,
            })
        }
    }

    render(){
        const toggle = this.state.out ? 'editor-in': 'editor-out';
        return(
            <div className={'editor-window '+toggle}>
                <div className='editor-header'>{this.state.header}</div>
                <div className='editor-content'>{this.state.content}</div>
            </div>
        )
    }

}
