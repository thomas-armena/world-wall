import React from 'react';
import '../styles.scss';
import SlideButton from './SlideButton';
import Selector from './Selector';
import WallStore from '../../stores/WallStore';
import SVGInline from "react-svg-inline";
import ImageSVG from '../../assets/Image_Icon.svg';
import TextSVG from '../../assets/Text_Icon.svg';
import ItemSVG from '../../assets/Item.svg';

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
        const imageBoxItem = {
			itemType: 'IMAGE_BOX',
			x: 400,
			y: 150,
			width: 100,
			height: 100,
			rotation: 0,
			src: '',
			serverSrc: '',
		};
        const textBoxItem = {
			itemType: 'TEXT_BOX',
			x: 400,
			y: 150,
			width: 100,
			height: 100,
			rotation: 0,
			text: "Insert text here",
        }
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
                        <div className='items'>
                            <Selector name='Image' item={imageBoxItem} svg={ImageSVG}/>
                            <Selector name='Text' item={textBoxItem} svg={TextSVG}/>
                        </div>
                    </div>
                    <div className="sidebar-ext">
                        <div className='slidebutton-items' >
                            <i className="material-icons slide-icon">work</i>
                        </div>
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
                        <div className='slidebutton-project'>
                            <i className="material-icons slide-icon">settings</i>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
