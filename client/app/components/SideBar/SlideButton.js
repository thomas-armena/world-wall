import React from 'react';
import '../styles.scss';
import SVGInline from "react-svg-inline";
import ItemSVG from '../../assets/Item.svg';

export default class SlideButton extends React.Component {

    render(){
        return(
            <div
                className="slidebutton"
                onClick={() => this.props.onClick()}
            >
                <SVGInline id='1' svg={ItemSVG} width='50' height='50'/>
            </div>
        );
    }
}
