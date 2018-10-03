import React from 'react';
import '../../styles.scss';
import WallStore from '../../../stores/WallStore';
import Dropzone from 'react-dropzone';
import axios from 'axios';


export default class EditImageBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount(){
        WallStore.on('UPDATE', this.handleUpdate);
    }

    componentWillUnmount(){
        WallStore.removeListener('UPDATE', this.handleUpdate);
    }

    handleUpdate(){

    }

    onDrop(files){
        var file = new FormData();

        let image = new window.Image();
        image.src = files[0].preview;
        image.onload = () => {
            WallStore.items['item_'+WallStore.getSelectedId()].src = image;
            WallStore.emit('UPDATE');
        }




        file.append('test',files[0]);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8000/imageupload',file,{'Content-Type': 'multipart/form-data'})
            .then(function (response) {
                console.log(response)
                WallStore.items['item_'+WallStore.getSelectedId()].serverSrc = response.data;
                console.log(WallStore.items['item_'+WallStore.getSelectedId()].serverSrc);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                Image Box
                <Dropzone
                    onDrop={files => this.onDrop(files)}
                    styles={{
                        width:'100%',
                        height:'100%',
                    }}
                >
                    <div> Drop images here </div>
                </Dropzone>
            </div>
        )
    }

}
