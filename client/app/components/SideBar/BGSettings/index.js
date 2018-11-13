import React from 'react';
import '../../styles.scss';
import Dropzone from 'react-dropzone';
import WallActions from '../../../actions/WallActions';
import WallStore from '../../../stores/WallStore';
import axios from 'axios';


export default class BGSettings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pattern: WallStore.getBG().pattern,
            width: WallStore.getBG().width,
            height: WallStore.getBG().height,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    onDrop(files){
        var file = new FormData();

        let image = new window.Image();
        image.src = files[0].preview;
        image.onload = () => {
            WallStore.items.background.src = image;
            WallStore.emit('UPDATE');
        }

        file.append('test',files[0]);
        axios.defaults.withCredentials = true;
        axios.post(process.env.IMAGE_UPLOAD,file,{'Content-Type': 'multipart/form-data'})
            .then(function (response) {
                console.log('serverSrc->'+response)
                WallStore.items.background.serverSrc = response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange(){
        let data = WallStore.getBG();
        console.log(this.refs.pattern.checked);
        data.pattern = this.refs.pattern.checked;
        data.width = this.refs.width.value;
        data.height = this.refs.height.value;
        WallActions.wallSetBG(data);
    }

    render(){
        return(
            <div className='widget'>
                <div className='header'>
                    Background Settings
                </div>
                <div className='widget-content'>
                    <form>
                        <input type='checkbox' name='bg-format' onChange={this.handleChange} ref='pattern'
                            defaultChecked={this.state.pattern}
                        />
                            Fill with pattern
                        <br/>
                    </form>
                    <form>
                        Width: <input type='number' ref='width' name='width' defaultValue={this.state.width} onChange={this.handleChange}/> px
                        Height: <input type='number' ref='height' name='height' defaultValue={this.state.height} onChange={this.handleChange}/> px
                    </form>
                    <hr/>
                    <form>
                        <div className='widget-header'>Image</div> <br/>
                        <Dropzone
                            onDrop={files => this.onDrop(files)}
                            styles={{
                                width:'100%',
                                height:'100%',
                            }}
                        >
                            <div> Drop images here </div>
                        </Dropzone>
                    </form>

                </div>
            </div>
        );
    }

}
