import React,{useState,useContext,useEffect,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SignIn  = ()=>{
    const history = useHistory()
    const [dataerr,setDataerr] = useState('')
    const user = JSON.parse(localStorage.getItem("user"))
    const [bar,setBar] = useState('')
    const sign = useRef(null)
    useEffect(()=>{
        setBar('')
        if(user){
        history.push('/')
    }
       setDataerr('')
       M.Modal.init(sign.current)
    },[])
    const {state,dispatch} = useContext(UserContext)    
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setDataerr('Enter email Correctly')
            return
        }
        setBar('1')
        setDataerr('')
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
                setDataerr(data.error)
                setBar('')
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               history.push('/')
           }
        }).catch(err=>{
            const elem = document.getElementById('signin');
            const instance = M.Modal.init(elem, {dismissible: false});
            instance.open();
            setBar('')
        })
    }
   return (
        <>
            <HelmetProvider>
              <Helmet>
                <title>SignIn</title>
                <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
                <meta name="author" content="Siva"/>
                <meta name="description" content="SignIn And For Get Some Fun" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </Helmet>
            </HelmetProvider>
          <div className="mycard">
          <div className="card auth-card input-field">
          
            <h2>Invisible India</h2>
            <input style={{ margin: '.5rem' }}
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input style={{ margin: '.5rem' }}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            {
            bar?
            <div className="bar progress">
                <div className="indeterminate"></div>
            </div>
            :''
            }
            <button style={{ margin: '.5rem' }} className="btn waves-effect waves-light #64b5f6 blue darken-1"onClick={()=>PostData()}>
                Login
            </button>
            <h6 style={{ margin: '.5rem',color: 'red' }}>{dataerr?dataerr:""}</h6>
            <h5 style={{ margin: '.5rem' }}>
                <Link to="/signup">Dont have an account ?</Link>
            </h5>
            <h6 style={{ margin: '.5rem' }}>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
        </div>
        <div id="signin" className="modal" ref={sign} style={{color:"black"}}>
          <div className="modal-content">
            <p>Something Went Wrong.. Plz Reload this page.</p>
            <button style={{width: 70}} onClick={()=>window.location.reload()}>Reload</button>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>
      </div>
    </>
   )
}


export default SignIn