import React from 'react';
import '../../styles.scss';
import FWindowActions from '../../../actions/FWindowActions';
import WallActions from '../../../actions/WallActions';
import WallStore from '../../../stores/WallStore';


export default class LoadOptions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loadOptions: WallStore.getLoadData(),
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        WallStore.on('DATA_LOADED', this.handleUpdate);
    }

    componentWillUnmount(){
        WallStore.removeListener('DATA_LOADED', this.handleUpdate);

    }

    handleUpdate(){
        this.setState({ loadOptions: WallStore.getLoadData() });
    }

    handleClick(wall){
        WallActions.wallLoad(wall);
        FWindowActions.fWindowHide();
    }

    render(){
        const Loads = ()=>(
            <div>
                {
                    this.state.loadOptions.map(load => (
                        <div key={load.wall.title}className="loadbtn" onClick={()=>this.handleClick(load.wall)}>{load.wall.title}</div>
                    ))
                }
            </div>
        );

        return(
            <div className="content-wrapper">
                <div className="header">Load Project</div>
                <div className="loadcontent">
                    <Loads />
                </div>
            </div>
        );
    }
}
