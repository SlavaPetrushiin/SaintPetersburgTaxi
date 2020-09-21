import React from 'react';
import classes from './MapPage.module.css'
//@ts-ignore
import mapboxgl from 'mapbox-gl';

type StateType = {
	lng: number
	lat: number
	zoom: number
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdmE5MXBldHJ1c2hpbiIsImEiOiJja2Y0YzZxb3cwNmg3MnJsY2M3cTBzYWtxIn0.NOIbmlQuifTg1sitvjGQ7w';

class MapPage extends React.Component<{}, StateType> {
	state = {
		lng: 30.2656504,
		lat: 59.8029126,
		zoom: 10
	};

	map = null as any;
  mapContainer = React.createRef() as any;

	componentDidMount() {
		const map = new mapboxgl.Map({
		container: this.mapContainer,
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [this.state.lng, this.state.lat],
		zoom: this.state.zoom
		});
		}

	componentWillUnmount() {
		this.map.remove();
	}

	render() {
		return (
			<div ref={el => this.mapContainer = el} className={classes.mapContainer} />
		)
	}
}

export default MapPage;