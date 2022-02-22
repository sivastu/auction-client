import React,{useEffect,useState,useContext,useRef} from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom'
import profile from '../../logo/img/profile.png'
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from 'react-helmet-async';
     
let file="";

const Profile  = ()=>{
    const[delid,setDelid] = useState('')
    const history = useHistory()
    const  followers = useRef(null)
    const  change = useRef(null)
    const  del = useRef(null)
    const  removeac = useRef(null)
    const [mypics,setMypics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [profileimg,setProfileimg] = useState([])
    const [items,setItems] = useState([])
    const [toco,setToco] =useState('')
    const [noMore,setnoMore] =useState(true)
    const [lim,setLim] = useState(10)
    const [skp,setSkp] = useState()

    useEffect(()=>{  
        setLim(10)
        setSkp(0)
        async function ftth() {
            await fetch(`/mypost/${lim}/${skp}`,{ 
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                    }).then(res=>res.json())
                        .then(result=>{
                        setMypics(result.mypost)
                        setSkp(10)
                        if(result.mypost==''){
                            setnoMore(false)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                M.Modal.init(followers.current)
                M.Modal.init(change.current)
                M.Modal.init(del.current)
                M.Modal.init(removeac.current)
                setDelid('')
                onFileChange = onFileChange.bind();
                 fetch('/postcount',{ 
                    headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                }).then(res=>res.json())
                .then(result=>{
                setToco(result)
                })
                async function fetchMyAPI() {
                await  fetch('/mypic',{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                }).then(res=>res.json())
                .then(result=>{
                setProfileimg(result.mypic)
                }).catch(err=>{
                console.log(err) 
                })
            }
                fetchMyAPI()
                ftth()
            },[])

        const fetchData=async()=>{
            let integ = parseInt (skp)
            await setSkp(10+integ)
            await fetch(`/mypost/${lim}/${skp}`,{ 
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
                }).then(res=>res.json())
                .then(result=>{
                setMypics([...mypics,...result.mypost])
                    if(result.mypost.length===0 || result.mypost.length<10){
                        setnoMore(false)
                    }
                }).catch(err=>{
                console.log(err)
                })
            }

            const user = JSON.parse(localStorage.getItem("user"))
            let remove = ''

            const style = {
                height: 30,
                border: "1px solid green",
                margin: 6,
                padding: 8
            };
            if(user){
                remove = user._id
            }else{
                history.push('/')
            }
            const updatePhoto = (file)=>{
                setImage(file)
            }
            let onFileChange=(e)=> {
                file = e.target.files[0];
            }

            const onSubmit=(e)=> {
                e.preventDefault()
                const formData = new FormData()
                formData.append('photo', file)
                    axios.post("http://localhost:5000/updatepic", formData, {
                    headers:{  
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                    })
                    .then(res=>res.json())
                    .then(data=>{
                    if(data.error){
                        console.log('error')
                    }else{
                        history.push('/')
                    }
                    }).catch(err=>{
                        console.log(err)
                    })
                    }

                const deletePost = async (postid)=>{
                    await fetch(`/deleteacc/${postid}`,{
                    method:"delete",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:"Bearer "+localStorage.getItem("jwt")
                    }
                    }).then(res=>res.json())
                    .then(result=>{              
                        history.push('/signin') 
                        localStorage.clear()
                    })
                    }
                    const deletesPost = (postid)=>{
                        fetch(`/deletepost/${postid}`,{
                        method:"delete",
                        headers:{
                            "Content-Type":"application/json",
                            Authorization:"Bearer "+localStorage.getItem("jwt")
                        }
                    }).then(res=>{
                    window.location.reload();
                    })
                    }


   return (
    <>
        <HelmetProvider>
          <Helmet>
            <title>Profile</title>
            <meta name="keywords" content="Tourist,india,Travel,find new place,India travel,best travel site"/>
            <meta name="author" content="Siva"/>
            <meta name="description" content="Share your Travel Experiance" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
        </HelmetProvider>
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px"
           }}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
            <div>
                {
                   profileimg.map(item=>{
                       return(
                        <img key="67" style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={item.pic?item.pic:profile}
                   />
                       )
                   })
               }
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%",padding:"10px"}}>
                       
                       <button data-target="modal4" className="prosubmit btn waves-effect waves-light large  modal-trigger" style={{color:"black"}}>Change Password</button>
                   </div>
                   <div className="align" style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{toco} posts</h6>
                       
                       <h6>{state?state.followers.length:"0"} followers</h6>
           
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>


               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button className="prosubmit btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" >Submit</button>

            </form>

            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
                <div className="row">

                    <InfiniteScroll
                        dataLength={mypics.length} 
                        next={fetchData}
                        hasMore={noMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }>
  
                        { mypics.map(item=>{
                            return(
                                <div key={item._id} className="col s6 m7 crdsi">
                                    <div className="card procad">
                                        <div className="card-image">
                                            <img  src={item.photo} alt={item.title} />
                                            <span className="card-title pub" >{item.public}</span>
                                        </div>
                                         <div className="card-action fxruby">
                                            <p >{item.title}</p>
                                            <i className="material-icons modal-trigger" style={{float:"right"}} onClick={()=>setDelid(item._id)} data-target="modal45" >delete</i>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
       
       <div id="modal3" className="modal" ref={followers} style={{color:"black"}}>
          <div className="modal-content">
            <button className="modal-close waves-effect waves-green btn-flat">Fallowers</button>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>

         <div id="modal4" className="modal" ref={change} style={{color:"black"}}>
          <div className="modal-content">
            <Link  className="prosubmit btn waves-effect waves-light large  modal-trigger" to="/changepassword">Click To Change Your Password</Link>
          </div>
          <div className="modal-footer">
            <button  data-target="modalrm" className="prosubmit btn waves-effect waves-light large  modal-trigger" style={{color:"black"}} >Remove Account</button>
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>

        <div id="modal45" className="modal" ref={del} style={{color:"black"}}>
          <div className="modal-content">
            <p>Delect Your Post</p>
            <button style={{width: 70}} onClick={()=>deletesPost(delid)}>Remove</button>
          </div>
          <div className="modal-footer">
          
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>

        <div id="modalrm" className="modal" ref={removeac} style={{color:"black"}}>
          <div className="modal-content">
            <p>Are you sure it will Erase All our data And Activity</p>
            <button style={{width: 70}}  onClick={()=>deletePost(remove)}>Remove</button>
          </div>
          <div className="modal-footer">
          
            <button className="modal-close waves-effect waves-green btn-flat"  >close</button>
          </div>
        </div>

        </>
   )
}


export default Profile