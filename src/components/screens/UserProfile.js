import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import profile from '../../logo/img/profile.png'
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    const [noMore,setnoMore] =useState(true)
    const [lim,setLim] = useState(10)
    const [skp,setSkp] = useState()
    const [det,setDet] = useState([])
    const [toco,setToco] = useState('')

    useEffect(()=>{
        setLim(10)
       const fir = async()=>{
        await fetch(`/user/${userid}/${lim}/${skp}`,{
           headers:{
                "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then (res=>res.json())
       .then(result=>{
            setProfile(result)
            setDet(result.posts)
            setSkp(10)
            if(result.posts==''){
                setnoMore(false)
            }
       })

       await fetch(`/postusercount/${userid}/`,{ 
            headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
        setToco(result)
        })
   }
   fir()
    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }

    const fetchData=async()=>{
            let integ = parseInt (skp)
            await setSkp(10+integ)
        await fetch(`/user/${userid}/${lim}/${skp}`,{
           headers:{
                "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then (res=>res.json())
       .then(result=>{
        console.log('two',result)
            setDet([...det,...result.posts])
                if(result.posts===0 || result.posts<10){
                    setnoMore(false)
                }
       })
       .catch((err)=>{
        console.log(err)
       })
    }


    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
   return (
   <>
   <HelmetProvider>
      <Helmet>
        <title>User Profile</title>
        <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
        <meta name="author" content="Siva"/>
        <meta name="description" content="User Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    </HelmetProvider>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
               <img key="67" style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={`http://localhost:3000/${userProfile.user.pic?userProfile.user.pic:profile}`}
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{toco} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                   </div>
                   {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
               </div>
               
           </div>
     
           <div className="gallery">
       <div className="row">
           <InfiniteScroll
                        dataLength={det.length} 
                        next={fetchData}
                        hasMore={noMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }>
               {det?
                   det.map(item=>{
                       return(

                       <div key={item._id} className="col s6 m7 crdsi">
                                    <div className="card procad">
                                        <div className="card-image">
                                            <img  className="item" src={`http://localhost:3000/${item.photo}`} alt={item.title}/>
                                        </div>
                                         <div className="card-action fxruby">
                                            <p >{item.title}</p>
                                        </div>
                                    </div>
                                </div>


                          
                       )
                   })
                   :''
               }
               </InfiniteScroll>
           </div>
           </div>
       </div>
       
       
       : <h2>loading...!</h2>}


       
       </>
   )
}


export default Profile