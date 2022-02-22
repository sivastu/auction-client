import React from 'react'
import {useHistory} from 'react-router-dom'

const Veri_success  = ()=>{
    const history = useHistory()
    const click=()=>{
        history.push('/signup')
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Invisible India</h2>
            <h6>Token Expired... email verification failed. Cilck To Back Signin Page and reregister For get another ACTIVATION KEY</h6>
            <button onClick={()=>click()}>Back to Signup</button>
        </div>
      </div>
   )
}


export default Veri_success