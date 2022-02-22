import { MapContainer, TileLayer, Marker, Popup ,Circle,Tooltip} from 'react-leaflet'
import React,{useState,useEffect,useRef} from 'react'
import M from 'materialize-css'
import L from 'leaflet';
import {Link} from 'react-router-dom'
import './styles.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import mark from '../../logo/mark.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Search from '../Search/'
import parse from "html-react-parser";

const Travel = ()=> {
  const [slug,setSlug] = useState('')
  const [gostid,setGostid] = useState()
  const [mage,setMage] = useState('')
  const [title,setTitle] = useState('')
  const [subt,setSubt] = useState('')
  const [ids,setIds] = useState('')
  const [gost,setGost] = useState('')
  const [allgost,setAllgost] = useState([])
  const [datas,setData] = useState([])
  const [lan,setLan] = useState('')
  const [lon,setLon] = useState('')
  const [zoom,setZoom] = useState('8')
  const [havelocation,setHavelocation] = useState(false)
  const [center,setCenter] = useState([13.08,80.27])
  const  marker = useRef(null)
  const trav = useRef(null)

  useEffect(() => {
    (async () => {
      try {
        M.Modal.init(marker.current)
        M.Modal.init(trav.current)
        const response = await fetch('/maps',{
        headers:{
         "Content-Type":"application/json",
        }
      }).then(res=>res.json())
      .then(result=>{
        setData(result.posts)
      })
      }
      catch (e) {
              // Instance is null error
        // const elem = await document.getElementById('travels');
        // const instance =await M.Modal.init(elem, {dismissible: false});
        // await instance.open();
      }
    })();
  },[]);

  const pos = [lan,lon];
  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  var myicon = L.icon({
    iconUrl:mark,
    iconSize:[25,41],
    iconAnchor:[12.5,41],
    popupAnchor:[0,-41]
  });

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Find Place</title>
          <meta name="description" content="Find A new Tourist And Travel"/>
          <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
          <meta name="author" content="Siva"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
      </HelmetProvider>
      <div>
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {havelocation ? 
            <Marker position={pos} icon={myicon}>
              <Popup>worked</Popup>
            </Marker> : ''
            }{
            datas.map(item=>{
              return(
                <Marker  key={item._id} 
                  position={[item.lan,item.lon]}
                  icon={myicon}
                  eventHandlers={{
                  click: (e) => {
                    let imgsss = JSON.parse(item.photo)
                    setMage(imgsss[0])
                    setTitle(item.tit)
                    setGostid(item)
                    setSlug(item.tit)
                    setSubt(item.sml)
                    setIds(item._id)
                    const elem = document.getElementById('modal123');
                    const instance = M.Modal.init(elem, {dismissible: false});
                    instance.open();
                  },
                }} >
                  <Tooltip direction="top" offset={[0, -40]}>
                    {item.tit}
                  </Tooltip>
              </Marker> 
            )
          })
        }
        <Card body className="msg_form">
          <CardTitle>Welcome</CardTitle>
            <CardText>Fell free to search new place</CardText>
        </Card>
      </MapContainer>
      </div>
      <div id="modal123" ref={marker} className="modal bottom-sheet">
       <div className="row">
        <div className="col s12 m4 l2">
        <div className="modal-content">
          <img key="67" style={{width:"360px",marginLeft:"auto",marginRight:"auto"}} src={mage?`http://localhost:3000/admin/${mage}`:''} />
        </div>
        </div>
        <div className="col s12 m4 26">
          <div className="modal-content">
            <h4>{title?title:"UnRegister"}</h4>
            <span>{parse(subt)}</span>
          </div>
        </div>
        <div className="col s12 m4 4">
          <div className="modal-content">
            <div className="modal-footer">
            <a href="#!"  className="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
          <div className="modal-footer">
            <Link className="modal-close" to={"/detail/"+slug.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')+"/"+ids}>Detail</Link>
          </div>
          </div>
        </div>

       </div>
      </div>
      <div id="travels" className="modal" ref={trav} style={{color:"black"}}>
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

export default Travel;