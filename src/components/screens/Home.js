import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Home  = ()=>{
    const [cmd,setCmd] = useState([])
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [noMore,setnoMore] =useState(true)
    const [lim,setLim] = useState(10)
    const [skp,setSkp] = useState()
    const [inp,setInp] = useState('')
    const [re,setRe] = useState(0)

    useEffect(()=>{
        setInp('')
        setRe(0)
    },[re])

    useEffect(()=>{
        setInp('')
        setRe(0)
        setLim(10)
        setSkp(0)
        if(JSON.parse(localStorage.getItem("user"))){
            fetch(`/allpost/${lim}/${skp}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
        
        }).then(res=>res.json())
       .then(result=>{
           setData(result.posts)
           setSkp(10)
       })
   }
    },[])

    const fetchData =async ()=>{
        let integ = parseInt (skp)
        await setSkp(10+integ)
        fetch(`/allpost/${lim}/${skp}`,{
           headers:{
                "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setData([...data,...result.posts])
               if(result.posts.length===0 || result.posts.length<10){
                    setnoMore(false)
                }
            })
       .catch(err=>{
            console.log(err)
            })
    }

    const likePost = async(id)=>{
      await fetch('/like',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId:id
          })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = async(id)=>{
      await fetch('/unlike',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId:id
          })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = async(text,postId)=>{
          await fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
            setRe(1)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
        <meta name="author" content="Siva"/>
        <meta name="description" content="All Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    </HelmetProvider>
    <div className="home">
       <InfiniteScroll
            dataLength={data.length} 
            next={fetchData}
            hasMore={noMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }>
            {
            data.map(item=>{
                return(
                <div className="card home-card alla" key={item._id}>
                    <div className="row rw">
                      <div className="col s6 m7 cooo">
                        <p className="header">
                            {item.updatedAt.substr(0, 10)}
                        </p>
                        <p className="tit">{item.title}</p>
                        <p className="">{item.des}</p>
                        <div className="huk">
                            <div className="row oko" >
                                <div className="col pdd">                 
                                </div>
                                <div className="col pdd2">
                                {
                                    item.likes.includes(state._id)
                                    ? <div>
                                    <i className="material-icons unlike"
                                        onClick={()=>{unlikePost(item._id)}} >thumb_down</i>
                                    <h6>{item.likes.length} likes</h6>
                                </div>
                                : 
                                <div>
                                    <i className="material-icons"
                                    onClick={()=>{likePost(item._id)}}>thumb_up </i>
                                    <h6>{item.likes.length} likes</h6>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="huk">
                    <div className="row" >
                        <div className="over" >
                       {
                        item.comments.map(record=>{
                            return(
                                record.postedBy?<h6 className="hh" key={record._id}>    
                                    <span className="cccm">{record.postedBy.name}</span>
                                    <span className="dte">{record.date.substr(0, 10)}</span>
                                    {record.text}</h6>
                                    : ''
                                )
                            })
                        }
                    </div>
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            makeComment(e.target[0].value,item._id)
                        }}>
                          <input value={inp} onChange={(e)=>setInp(e.target.value)} type="text" placeholder="add a comment" />  
                        </form>
                   </div>
                </div>
            </div>
            <div className="col s6 m7 seco">
                <h4 className="header"><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link></h4>
                <div className="tty">
                    <img className="riimg"  src={item.photo}/>
                </div>
            </div>
        </div>
    </div>
           )
       })
    }
  </InfiniteScroll>
 </div>
 </>
   )
}

export default Home