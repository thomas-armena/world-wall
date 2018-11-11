import React from 'react';
import WallStore from '../../stores/WallStore';
import WallActions from '../../actions/WallActions';
import ImageSVG from '../../assets/Image_Icon.svg';
import TextSVG from '../../assets/Text_Icon.svg';
import SVGInline from "react-svg-inline";




const Icon = (props)=>{
    return (
        <SVGInline
            id='2'
            svg={props.svg}
            width='110'
            height='110'
            style={{
                position:'absolute',
                left:props.x+'px',
                top:props.y+'px',
                width: '110px',
                height: '110px',
            }}
        />
    );
}





export default class DragLayer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dragging: false,
            x: 100,
            y: 100,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount(){
        WallStore.on('DRAGSTART', this.handleDragStart);
        WallStore.on('UPDATE', this.handleUpdate);
    }

    componentWillUnmount(){
        WallStore.removeListener('DRAGSTART', this.handleDragStart);
        WallStore.removeListener('UPDATE', this.handleUpdate);
    }

    handleDragStart(){
        this.setState({
            dragging: true,
            x: WallStore.dragStartX-50,
            y: WallStore.dragStartY-30-50,
        });
    }

    handleUpdate(){
        this.setState({dragging: false});
    }

    handleMouseMove(e){
        this.setState({
            x: e.clientX-50,
            y: e.clientY-40-50,
        })
    }

    handleMouseUp(e){
        const item = WallStore.getStoredItem();
        item['mouse'] = {
            x: e.clientX,
            y: e.clientY-40,
        }
        WallActions.itemAdd(item);
    }


    render(){
        let iconToggle;
        let dragOverlay;
        let svg;
        if(WallStore.getStoredItem().itemType == 'IMAGE_BOX'){
            svg = ImageSVG;
        } else if (WallStore.getStoredItem().itemType == 'TEXT_BOX'){
            svg = TextSVG;
        }
        if(this.state.dragging){
            iconToggle = (
                <div >
                    <Icon svg={svg} x={this.state.x} y={this.state.y}/>
                </div>
            );
            dragOverlay = (
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        cursor: 'grabbing',
                        zIndex: '100',
                    }}
                    onMouseMove={(e)=>this.handleMouseMove(e)}
                    onMouseUp={(e)=>this.handleMouseUp(e)}
                />
            );
        } else {
            iconToggle = <div />
            dragOverlay = <div/>
        }
        return(
            <div>
                {dragOverlay}
                <div className='drag-layer' onMouseDown={(e)=>this.handleMouseMove(e)}>
                    {iconToggle}
                </div>
            </div>
        );
    }
}
