import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
import { FaRegUser,FaRegEdit,FaRegPlayCircle,FaRegWindowClose,FaSignInAlt,FaRegIdCard,FaMapMarkedAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";

import logo from '../logo/logo_4.gif'


import '../css/nav.css'



const NavBar = ()=>{
    const  searchModal = useRef(null)
    const  logOut = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
         M.Modal.init(logOut.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
            <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger search" style={{color:"black"}}>search</i></li>,
            <li key="5"><i  data-target="modal2" className="large material-icons modal-trigger exit_to_app" style={{color:"black"}}>logout</i></li>
           ]
       }else{
         return [
         <li key="32"><Link to="/travel">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaMapMarkedAlt />
              </div>
            </IconContext.Provider>
            </Link></li>,
          <li key="33"><Link to="/signin">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaSignInAlt />
              </div>
            </IconContext.Provider>
            </Link></li>,
          <li key="31"><Link to="/signup">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaRegIdCard />
              </div>
            </IconContext.Provider>
            </Link></li>
         
         ]
       }
     }


     const renderListlink = ()=>{
       if(state){
           return [
            <li key="2"><Link to="/profile">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaRegUser />
              </div>
            </IconContext.Provider>
            </Link></li>,
            <li key="3"><Link to="/create">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaRegEdit />
              </div>
            </IconContext.Provider>
            </Link></li>,
            //<li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
            <li key="8"><Link to="/maps">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaMapMarkedAlt />
              </div>
            </IconContext.Provider>
            </Link></li>,
            <li key="9"><Link to="/">
            <IconContext.Provider value={{ color: "black", className: "global-class-name",size:"1.5em" }}>
              <div>
                <FaRegPlayCircle />
              </div>
            </IconContext.Provider>
            </Link></li>
         
            
           ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
      <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/india"} className="brand-logo center"><img className="logocss" src={logo} alt="loading..." /></Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
             </ul>
            <ul id="nav-mobile" className="left">
             {renderListlink()}
             </ul>
             
        </div>

        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
            <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">

             { state!==null?userDetails.map(item=>{


                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               }) :
               dispatch('')
               }
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>





      <div className="sec_nav">
      <div className="second_nav">

      </div>
      </div>



        <div id="modal2" className="modal" ref={logOut} style={{color:"black"}}>
          <div className="modal-content">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }} >Logout</button>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>

      </nav>
    )
}




export default NavBar