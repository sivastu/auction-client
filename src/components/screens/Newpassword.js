import React,{useState,useContext,useEffect,useRef} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const SignIn  = ()=>{
    const  change = useRef(null)
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [password,setPasword] = useState("")
    const {token} = useParams()
    const [dataerr,setDataerr] = useState('')
    const [bar,setBar] = useState('')

    useEffect(()=>{
        setBar('')
        M.Modal.init(change.current)
    },[])

    const PostData = ()=>{
         setBar('1')
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
             setBar('')
               setDataerr(data.error)
           }
           else{
               const elem = document.getElementById('modal4');
               const instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
                setDataerr('')
                 setBar('')
           }
        }).catch(err=>{
            setDataerr('Something went wront plz.. Reload the Page')
            console.log(err)
        })
    }
   return (
    <>
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Invisible India</h2>
            <h6>Type New Password</h6>
            <input
                type="password"
                placeholder="enter a new password"
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
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Update password
            </button>
            <h6 style={{ margin: '.5rem',color: 'red' }}>{dataerr?dataerr:""}</h6>
    
        </div>
      </div>
      <div id="modal4" className="modal" ref={change} style={{color:"black"}}>
          <div className="modal-content">
            <h6>Password Changed Successfully</h6>
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }} >Return to SignIn Page</button>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" >close</button>
          </div>
        </div>
        </>
   )
}

export default SignIn