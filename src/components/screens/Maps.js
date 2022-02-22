import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React,{useState,useEffect,Component} from 'react'
import M from 'materialize-css'
import L from 'leaflet';
import {useHistory} from 'react-router-dom'
import './styles.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import mark from '../../logo/mark.png'
import Search from '../Search/'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Maps =()=> {
  const [lan,setLan] = useState('')
  const [lon,setLon] = useState('')
  const [zoom,setZoom] = useState('8')
  const [havelocation,setHavelocation] = useState(false)
  const [center,setCenter] = useState([13.08,80.27])
  const [all,setAll] = useState(''/*[[11.08,60.27],[19.08,40.27]]*/)
  
    var myicon = L.icon({
      iconUrl:mark,
      iconSize:[25,41],
      iconAnchor:[12.5,41],
      popupAnchor:[0,-41]
    });

    useEffect(() => {
      console.log(all[1])
    }, []);

  const find=()=>{
     navigator.geolocation.getCurrentPosition((position)=>{
      setLan(position.coords.latitude)
      setLon(position.coords.longitude)
      setZoom('14')
      setHavelocation(true)
  },()=>{
    fetch('https://ipapi.co/json')
    .then(res=>res.json())
    .then(location=>{
      setLan(location.latitude)
      setLon(location.longitude)
      setZoom('14')
      setHavelocation(true)
      });
    });
  }

    const pos = [lan,lon];
    const fillBlueOptions = { fillColor: 'blue' }
    const blackOptions = { color: 'black' }
    const limeOptions = { color: 'lime' }
    const purpleOptions = { color: 'purple' }
    const redOptions = { color: 'red' }

    return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Maps</title>
          <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
          <meta name="author" content="Siva"/>
          <meta name="description" content="User Map Activity Detail" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
      </HelmetProvider>
      <div>
          <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              havelocation ? 
              <Marker  position={pos} icon={myicon}>
                <Popup>
                  worked
                </Popup>
              </Marker> : ''
            }
            {
              all?
                all.map(item=>{
                  return(
                    <Marker key={item} position={item} icon={myicon}>
                      <Popup>
                        worked
                      </Popup>
                    </Marker> 
                    )
                  }) 
                : ''
            }
            <Card body className="msg_form">
                <CardTitle>Under Work</CardTitle>
                  <CardText>Under Work</CardText>
                  <Button /*onClick={()=>find()}*/>Go somewhere</Button>
              </Card>
          </MapContainer>
       </div>
      </>
      ) 
}

export default Maps;