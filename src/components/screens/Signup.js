import React,{useState,useEffect,useRef} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { Helmet, HelmetProvider } from 'react-helmet-async';
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [bar,setBar] = useState('')
    const [dataerr,setDataerr] = useState('')
    const user = JSON.parse(localStorage.getItem("user"))
    const  success = useRef(null)
    const  fail = useRef(null)
    useEffect(()=>{
        setBar('')
        M.Modal.init(success.current)
        M.Modal.init(fail.current)
         if(user){
        history.push('/')
    }
        if(url){
            uploadFields()
        }
    },[url])

    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            setDataerr('Enter email Correctly')
            return
        }
        setBar('1')
        setDataerr('')
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
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
                const elem = document.getElementById('modal3');
                const instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
                setBar('')
           }
        }).catch(err=>{
                const elem = document.getElementById('fail');
                const instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
                setBar('')
        })
    }
    const PostData = ()=>{
        
            uploadFields()
       
    }

   return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>SignIn</title>
        <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
        <meta name="author" content="Siva"/>
        <meta name="description" content="SignUp And For Get Some Fun" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    </HelmetProvider>
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Invisible India</h2>
            
            <input style={{ margin: '.5rem' }}
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
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
            <button style={{ margin: '.5rem' }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
            >
                SignUP
            </button>
                <h6 style={{ margin: '.5rem',color: 'red' }}>{dataerr?dataerr:""}</h6>
                <h5 style={{ margin: '.5rem' }}>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
        </div>


        <div id="modal3"  className="modal" ref={success} style={{color:"black",top:'30%'}}>
          <div style={{ margin: '.5rem' }} className="modal-content">
            <h5 style={{ margin: '.5rem' }}>Chect our Email </h5>
            <Link className="popuplink" style={{ margin: '.5rem',color: 'red' }} to="/signin">Back To Signin</Link>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>
      </div>
      <div id="signin" className="modal" ref={fail} style={{color:"black"}}>
          <div className="modal-content">
            <p>Something Went Wrong.. Plz Reload this page.</p>
            <button style={{width: 70}} onClick={()=>window.location.reload()}>Reload</button>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>
      </>
   )
}


export default SignIn