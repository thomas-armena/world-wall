import React from 'react';
import '../../styles.scss';
import WallStore from '../../../stores/WallStore'


export default class EditImageBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        WallStore.on('UPDATE', ()=>this.handleUpdate());
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', ()=>this.handleUpdate());
    }

    handleUpdate(){

    }

    handleChange(){
        var selectedFile = document.getElementById('imagedrop').files[0];
        console.log(selectedFile);
    }

    render(){
        return(
            <div>
                Image Box
                <form action="/action_page.php">
                    <input
                        type="file"
                        name="pic"
                        accept="image/*"
                        id='imagedrop'
                        onChange={()=>this.handleChange()}
                    />
                </form>
            </div>
        )
    }

}
