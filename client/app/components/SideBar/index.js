import React from 'react';
import '../styles.scss';
import SlideButton from './SlideButton';
import TextBoxSelector from './TextBoxSelector';
import ImageSelector from './ImageSelector';
import WallStore from '../../stores/WallStore';
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outItems: false,
            outProject: false,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    componentDidMount(){
        WallStore.on('DRAGSTART', this.handleDragStart);
    }

    componentWillUnmount(){
        WallStore.removeListener('DRAGSTART', this.handleDragStart);
    }

    handleDragStart(){
        this.setState({outItems: false});
    }



    slideItems() {
        this.setState({outItems: true});
    }

    slideItemsOut(){
        this.setState({outItems: false});
    }

    slideProject(){
        this.setState({outProject: true});
    }

    slideProjectOut(){
        this.setState({outProject: false});
    }


    render() {
        let itemsclass = this.state.outItems? 'sidebar-out' : 'sidebar-in';
        let projectclass = this.state.outProject? 'sidebar-out' : 'sidebar-in';
        return (

            <div>
                <div className={'sidebar-items '+itemsclass}
                    onMouseEnter={()=>this.slideItems()}
                    onMouseLeave={()=>this.slideItemsOut()}
                >
                    <div className='sidebar-content-items'>
                        <div className='header-items'>Items</div>
                        <TextBoxSelector />
                        <ImageSelector />
                    </div>
                    <div className="sidebar-ext">
                        <div className='slidebutton-items' />
                    </div>
                </div>
                <div className={'sidebar-project '+projectclass}
                    onMouseEnter={()=>this.slideProject()}
                    onMouseLeave={()=>this.slideProjectOut()}
                >
                    <div className='sidebar-content-project'>
                        <div className='header-project'>Project Settings</div>
                        <div className='option'>Save</div>
                        <div className='option'>Load</div>
                        <div className='option'>Rename</div>
                    </div>
                    <div className="sidebar-ext">
                        <div className='slidebutton-project' />
                    </div>
                </div>
            </div>

        );
    }
}
