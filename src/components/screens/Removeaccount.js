import React,{useState,useContext,useEffect,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Removeaccount  = ()=>{
    const history = useHistory()
    const [dataerr,setDataerr] = useState('')
    const usmail = JSON.parse(localStorage.getItem("user"))
    const usermail = usmail.email
    const  success = useRef(null)    
    useEffect(()=>{
        console.log('email',usermail)
        M.Modal.init(success.current)
       setDataerr('')
    },[])

    
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           setDataerr('Enter Correct email id')
            return
        }
        if(usermail!==email){
            console.log('failed',usermail)
            setDataerr('Enter Your email id')
            return
        }else{
            console.log('success')
            setDataerr('')
        }
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              setDataerr('Something Went Wrong.. Plz Check Your Internet Connection')
           }
           else{
            console.log('susss')
               const elem = document.getElementById('modal3');
               const instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
               // history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Invisible India</h2>
            <h6 style={{ margin: '.5rem' }}>Remove Account</h6>
            <input style={{ margin: '.5rem' }}
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button style={{ margin: '.5rem' }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               reset password
            </button>
            <h6 style={{ margin: '.5rem',color: 'red' }}>{dataerr?dataerr:""}</h6>
    
        </div>

        <div id="modal3"  className="modal" ref={success} style={{color:"black",top:'30%'}}>
          <div style={{ margin: '.5rem' }} className="modal-content">
          <h5 style={{ margin: '.5rem' }}>Chect our Email</h5>
          <Link className="popuplink" style={{ margin: '.5rem',color: 'red' }} to="/profile">Back To Profile Page</Link>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>
      </div>
   )
}


export default Removeaccount