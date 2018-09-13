import React from 'react';
import '../styles.scss';
import SlideButton from './SlideButton';
import TextBoxSelector from './TextBoxSelector';
import ImageSelector from './ImageSelector';
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outItems: false,
            outProject: false,
        };
    }

    slideItems() {
        this.setState({outItems: !this.state.outItems});
    }

    slideProject(){
        this.setState({outProject: !this.state.outProject});
    }


    render() {
        let itemsclass = this.state.outItems? 'sidebar-out' : 'sidebar-in';
        let projectclass = this.state.outProject? 'sidebar-out' : 'sidebar-in';
        return (

            <div>
                <div className={'sidebar-items '+itemsclass}>
                    <div className='sidebar-content-items'>
                        <div className='header-items'>Items</div>
                        <TextBoxSelector />
                        <ImageSelector />
                    </div>
                    <div className="sidebar-ext">
                        <div className='slidebutton-items' onClick={()=>this.slideItems()} />
                    </div>
                </div>
                <div className={'sidebar-project '+projectclass}>
                    <div className='sidebar-content-project'>
                        <div className='header-project'>Project Settings</div>
                        <div className='option'>Save</div>
                        <div className='option'>Load</div>
                        <div className='option'>Rename</div>
                    </div>
                    <div className="sidebar-ext">
                        <div className='slidebutton-project' onClick={()=>this.slideProject()} />
                    </div>
                </div>
            </div>

        );
    }
}
