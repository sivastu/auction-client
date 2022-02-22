import React,{useEffect,useState,useRef} from 'react'
import M from 'materialize-css'
import {useParams} from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import parse from "html-react-parser";

const Detail  = ()=>{
   const {slug} = useParams()
   const {id} = useParams()
   const [images,setImages] = useState([])
   const [tail,setTail] = useState('')
   const [big,setBig] = useState('')
   const [small,setSmall] = useState('')
   const detail = useRef(null)

   useEffect(()=>{
      const deta = async()=>{
         M.Modal.init(detail.current)
         await fetch(`/details/${id}`,{
            headers:{
                "Content-Type":"application/json"
           }
       }).then (res=>res.json())
       .then(result=>{
         setTail(result.tit)
         setBig(result.big)
         setSmall(result.sml)
         setImages(JSON.parse(result.photo))
       })
       .catch(err=>{
         const elem = document.getElementById('detail');
         const instance = M.Modal.init(elem, {dismissible: false});
         instance.open();
    })
   }   
   deta()
   },[])

   return (
    <>
         <div className="card auth-card deta input-field">
            <Carousel autoPlay={true} infiniteLoop={true}>
            {
               images.map(res=>{
                  return(
                     <div key={res}>
                        <img  src={`http://localhost:3000/admin/${res}`} alt='Image' />
                     </div>
                     )
               })
            }
      
            </Carousel>
      <h2 style={{marginBottom:15}}>{tail}</h2>
         <h6 style={{marginBottom:15}}>{parse(small)}</h6>
      <span>{parse(big)}</span>
   </div>
   <HelmetProvider>
      <Helmet>
         <title>{tail}</title>
         <meta name="description" content={small}/>
          <meta name="keywords" content={small}/>
          <meta name="author" content="Siva"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
   </HelmetProvider>
   <div id="detail" className="modal" ref={detail} style={{color:"black"}}>
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


export default Detail