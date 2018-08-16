import React from 'react';
import '../styles.scss';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="nav-bar">
                {this.props.children}
            </div>
        );
    }

}
