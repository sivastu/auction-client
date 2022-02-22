import React from 'react'
import {useHistory} from 'react-router-dom'

const Veri_success  = ()=>{
    const history = useHistory()
    const click=()=>{
        history.push('/signin')
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Invisible India</h2>
            <h6> Your Email Verified Successfully .Cilck To Back Signin Page.</h6>
            <button onClick={()=>click()}>Back to Signin</button>
        </div>
      </div>
   )
}


export default Veri_success