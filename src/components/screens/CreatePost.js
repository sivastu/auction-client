import React,{useState,Component} from 'react'
import M from 'materialize-css' 
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
let file="";

export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
      name: '',
      des: '',
      public:''
     }
        file=""  
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    handlename = e => this.setState({name: e.target.value})
    handledes = e => this.setState({des: e.target.value})
    handlepublic = e => this.setState({public: e.target.value})

    onFileChange(e) {
         file = e.target.files[0];
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('title', this.state.name)
        formData.append('des' ,this.state.des)
        formData.append('public' ,this.state.public)
        console.log(formData)
        axios.post("http://localhost:5000/createpost", formData, {
            headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
       })
    .then(data=>{
       if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
        window.location.reload();
        
       }
    }).catch(err=>{
        console.log(err)
    })
    }

  render(){
   return(
    <>
        <HelmetProvider>
          <Helmet>
            <title>Create Post</title>
            <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
            <meta name="author" content="Siva"/>
            <meta name="description" content="Create Your Post" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
        </HelmetProvider>
       <div className="card input-filed"
        style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
         }}
       >
           <form onSubmit={this.onSubmit}>
           <div className="row " >
             <div className="col s12">
                <input type="text" placeholder="Title" value={this.state.name} onChange={this.handlename} name ="name" required/>
                </div>
            </div>
        <div className="row " >
        <div className="col s12">
           <textarea id="textarea2" className="materialize-textarea" data-length="120" required placeholder="Type Some Text" name="des" value={this.state.des} onChange={this.handledes} />
        </div>
        </div>
            <div className="row">
            <div className="col s12">
                <select className=" browser-default" name="public" defaultValue={'DEFAULT'} onChange={this.handlepublic} required  >
                    <option value="DEFAULT" disabled>Public Or Private</option>
                    <option value="public" >Public</option>
                    <option value="private">Private</option>
                </select>
                </div>
            </div>
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={this.onFileChange} required/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <div>
                {/* {
                    ary.map(item=>{
                        return[
                            <h5 key={item}>higeiuuui</h5>
                        ]
                    }) 
                } */}
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" >Submit post</button>
            </form>
       </div>
       </>
   )
}
}
