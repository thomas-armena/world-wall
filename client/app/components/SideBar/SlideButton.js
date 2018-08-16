import React from 'react';
import '../styles.scss';

export default class SlideButton extends React.Component {

    render(){
        return(
            <div
                className="slidebutton"
                onClick={() => this.props.onClick()}
            />
        );
    }
}
