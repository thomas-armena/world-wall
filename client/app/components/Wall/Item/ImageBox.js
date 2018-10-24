import React from 'react';
import Item from './index';
import { Text, Rect, Image } from 'react-konva';

export default class ImageBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    render() {
        return(
            <Item
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                rotation={this.props.rotation}
                edit={this.props.edit}
                id={this.props.id}
            >
                <Rect
                    width={this.props.width}
                    height={this.props.height}
                    fill='#E6E6EA'
                />
                <Image
                    image={this.props.src}
                    width={this.props.width}
                    height={this.props.height}
                />
            </Item>
        );
    }
}
