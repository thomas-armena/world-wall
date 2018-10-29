import React from 'react';
import Item from './index';
import { Text, Rect, Image, Group } from 'react-konva';

export default class ImageBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    render() {
        let filler;
        if (this.props.src != ''){
            filler = < Group />
        } else {
            filler = <Rect
                width={this.props.width}
                height={this.props.height}
                fill='#E6E6EA'
            />
        }
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
                {filler}
                <Image
                    image={this.props.src}
                    width={this.props.width}
                    height={this.props.height}
                />
            </Item>
        );
    }
}
