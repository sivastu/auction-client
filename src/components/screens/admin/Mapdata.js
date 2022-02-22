import React,{useState,useContext,useEffect,Component } from 'react'
import {Link,useHistory} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import M from 'materialize-css'
import axios from 'axios';

export default class UploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onImgChange = this.onImgChange.bind(this);
        this.onUpload = this.onUpload.bind(this);

        this.state = {
            imagesArray: '',
            lan: 0,
            lon: 0,
            tit: '',
            sml: '',
            big: ''
        }
    }

    onImgChange(event) {
        this.setState(
            { 
                imagesArray: [...this.state.imagesArray, ...event.target.files] 
            }
        )
    }

    onUpload(event) {
        event.preventDefault()
        let formData = new FormData();
        formData.append('lan', this.state.lan)
        formData.append('lon', this.state.lon)
        formData.append('tit', this.state.tit)
        formData.append('big', this.state.big)
        formData.append('sml', this.state.sml)

        for (const key of Object.keys(this.state.imagesArray)) {
            formData.append('imagesArray', this.state.imagesArray[key])
        }
        axios.post("http://localhost:5000/landata", formData, {
        }).then(response => {
            this.setState({tit:''})
            this.setState({lan:0})
            this.setState({lon:0})
            this.setState({sml:''})
            this.setState({big:''})
            console.log((response.data))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="mycard">
          <div style={{maxWidth:1200}} className="card  auth-card input-field">
            <h2>Insert Map Data</h2>
                <form onSubmit={this.onUpload}>

                    
                    <div className="form-group">
                        <input className="form-control form-control-lg mb-3" type="file" multiple name="imagesArray" onChange={this.onImgChange} />
                    </div>

                    <input
            type="text"
            placeholder="lan"
            value={this.state.lon}
            onChange={(e)=>this.setState({lon:e.target.value})}
            />
            <input
            type="text"
            placeholder="lon"
            value={this.state.lan}
            onChange={(e)=>this.setState({lan:e.target.value})}
            />
            <input
            type="text"
            placeholder="title"
            value={this.state.tit}
            onChange={(e)=>this.setState({tit:e.target.value})}
            />
            <CKEditor
                    editor={ ClassicEditor }
                    data= {this.state.big}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({big:data})
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
                />
                

                 <CKEditor
                    editor={ ClassicEditor }
                    data= {this.state.sml}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({sml:data})
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
                />

                    <div className="d-grid">
                        <button className="btn btn-danger" type="submit">Submit</button>
                    </div>
                </form>
             </div>
      </div>
        )
    }
}



