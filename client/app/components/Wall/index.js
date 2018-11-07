import React from 'react';
import '../styles.scss';
import { Group, Stage, Layer, } from 'react-konva';
import WallActions from '../../actions/WallActions';
import WallStore from '../../stores/WallStore';
import TextBox from './Item/TextBox';
import ImageBox from './Item/ImageBox';
import TransformerComponent from './TransformerComponent';

export default class Wall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stageHeight: 100,
            stageWidth: 100,
            canDrag: true,
            draggingNew: true,
            items: {},
            selectedId: null,
        };
        this.mouseOverStage = false;
        this.onUpdate = this.onUpdate.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', ()=>this.updateSize());
        window.addEventListener('wheel', (e)=>this.zoomStage(e));
        WallStore.on('UPDATE', this.onUpdate);
        WallStore.on('DRAGSTART', this.handleDragStart);
        WallStore.emit('UPDATE');

        //update stage positions
        var stageInst = this.refs.stage.getStage();
        stageInst.scale({ x: WallStore.scale, y: WallStore.scale });
        stageInst.position({ x: WallStore.x, y: WallStore.y }) ;
    }


    componentWillUnmount() {
        window.removeEventListener('wheel', (e)=>this.zoomStage(e));
        window.removeEventListener('resize', ()=>this.updateSize());
        WallStore.removeListener('UPDATE', this.onUpdate);
        WallStore.removeListener('DRAGSTART', this.handleDragStart);

        //Save stage positions
        var stageInst = this.refs.stage.getStage();
        WallStore.x = stageInst.position().x;
        WallStore.y = stageInst.position().y;
    }

    onUpdate() {
        this.setState({
          items: WallStore.getItems(),
          selectedId: WallStore.getSelectedId(),
          draggingNew: false
        });
    }

    handleDragStart(){
        this.setState({draggingNew:true});
    }


    updateSize() {
        const width = window.innerWidth;
        const height = window.innerHeight-40;
        this.setState( { stageWidth: width, stageHeight: height });
    }

    zoomStage(e) {
        if(this.mouseOverStage == true){
            var scaleBy = 1 + Math.abs(Math.min(e.deltaY, 100)) / 90;
            var stageInst = this.refs.stage.getStage();
            e.preventDefault();
            var oldScale = stageInst.scaleX();

            var mousePointTo = {
                x: stageInst.getPointerPosition().x / oldScale - stageInst.x() / oldScale,
                y: stageInst.getPointerPosition().y / oldScale - stageInst.y() / oldScale,
            };
            var newScale = e.deltaY > 0 ? Math.min(oldScale * scaleBy, 4) : Math.max(oldScale / scaleBy, 0.1);
            WallStore.scale = newScale;
            stageInst.scale({ x: newScale, y: newScale });

            var newPos = {
                x: -(mousePointTo.x - stageInst.getPointerPosition().x / newScale) * newScale,
                y: -(mousePointTo.y - stageInst.getPointerPosition().y / newScale) * newScale
            };
            WallStore.x = newPos.x;
            WallStore.y = newPos.y;
            stageInst.position(newPos);
            stageInst.batchDraw();
        }
    }


    handleClick(e) {
        if(e.target == this.refs.stage.getStage())
            WallActions.itemClick(null);
    }



    render(){
        console.log('ren:')
        console.log(this.state.items)
        let itemsJSX = [];
        for (var i in this.state.items){
            const itemData = this.state.items[i];
            let item = null;
            if (itemData['mouse']){
                var stage = this.refs.stage.getStage();
                const mouseX = itemData.mouse.x / WallStore.scale - stage.x() / WallStore.scale;
    			const mouseY = itemData.mouse.y / WallStore.scale - stage.y() / WallStore.scale;
                itemData.x = mouseX;
                itemData.y = mouseY;
                WallStore.items['item_'+itemData.id].x = itemData.x;
                WallStore.items['item_'+itemData.id].y = itemData.y;
                itemData.mouse = null;

            }
            switch(itemData.itemType){
            case 'TEXT_BOX':
                item = <TextBox
                    key={i}
                    id = {itemData.id}
                    text = {itemData.text}
                    x = {itemData.x}
                    y = {itemData.y}
                    width = {itemData.width}
                    height = {itemData.height}
                    rotation = {itemData.rotation}
                    edit = {this.props.edit}
                />;
                break;
            case 'IMAGE_BOX':
                item = <ImageBox
                    key={i}
                    id = {itemData.id}
                    src = {itemData.src}
                    x = {itemData.x}
                    y = {itemData.y}
                    width = {itemData.width}
                    height = {itemData.height}
                    rotation = {itemData.rotation}
                    edit = {this.props.edit}
                />
            }
            itemsJSX.push(item);
        }
        let transformer = <Group />;
        if (this.props.edit){
            transformer = <TransformerComponent />;
        }
        return (
            <div id="wall"
                onMouseOver={()=>{this.mouseOverStage = true;}}
                onMouseOut={()=>{this.mouseOverStage = false;}}
            >
                <Stage width={this.state.stageWidth}
                    height={this.state.stageHeight}
                    draggable={this.state.canDrag}
                    onDragEnd={this.handleDrop}
                    ref="stage"
                    onClick={(e)=>this.handleClick(e)}
                >
                    <Layer>
                        {itemsJSX}
                        {transformer}
                    </Layer>
                </Stage>
            </div>
        );
    }
}
