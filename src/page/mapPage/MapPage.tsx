import React, { useEffect } from 'react';
//@ts-ignore
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdmE5MXBldHJ1c2hpbiIsImEiOiJja2Y0YzZxb3cwNmg3MnJsY2M3cTBzYWtxIn0.NOIbmlQuifTg1sitvjGQ7w';

class MapPage extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
		lng: 5,
		lat: 34,
		zoom: 2
		};
		}
	

	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [5, 34],
			zoom: 2
			});
		}

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div ref={this.mapContainer} />;
  }	
}


/*
= () => {
	let map = null;
	let mapContainer = React.createRef();
	
	useEffect(() => {
		mapboxgl.accessToken = "pk.eyJ1Ijoic2xhdmE5MXBldHJ1c2hpbiIsImEiOiJja2Y0YzZxb3cwNmg3MnJsY2M3cTBzYWtxIn0.NOIbmlQuifTg1sitvjGQ7w";
    this.map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
	}, [])

	return (
		<p style={{color: "white", backgroundColor: "grey",  marginBottom: 10}}> MApPage</p>
	)
};
*/
export default MapPage ;