import React from 'react';
import './styles.css';
import FWindowActions from '../../actions/FWindowActions';
import WallActions from '../../actions/WallActions';
import WallStore from '../../stores/WallStore';


export default class LoadOptions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loadOptions: WallStore.getLoadData(),
        }
    }

    componentDidMount(){
        WallStore.on('DATA_LOADED', ()=>this.handleUpdate());
    }

    componentWillUnmount(){
        WallStore.removeListener('DATA_LOADED', ()=>this.handleUpdate());

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
                        <button onClick={()=>this.handleClick(load.wall)}>{load.wall.title}</button>
                    ))
                }
            </div>
        );

        return(
            <div className="content-wrapper">
                <Loads />
            </div>
        );
    }
}

