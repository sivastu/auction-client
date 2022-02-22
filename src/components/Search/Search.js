import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const Search =()=> {

  const createLeafletElement =()=> {

    return GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'search'
    });
  }
}

export default Search;