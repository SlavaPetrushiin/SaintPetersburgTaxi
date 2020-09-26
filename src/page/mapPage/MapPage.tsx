import React, { useEffect, useState } from 'react';
import classes from './MapPage.module.css'
//@ts-ignore
import mapboxgl from 'mapbox-gl';
import fetchAddressList from '../../api/addressList';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdmE5MXBldHJ1c2hpbiIsImEiOiJja2Y0YzZxb3cwNmg3MnJsY2M3cTBzYWtxIn0.NOIbmlQuifTg1sitvjGQ7w';

const MapPage = () => {
	const [lng, setLng] = useState<number>(30.2656504);
	const [lat, setLat] = useState<number>(59.8029126);
	const [zoom, setZoom] = useState<number>(10);

  let mapContainer = React.createRef() as any;

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
			});

			return function mapRemove(){
				map.remove()
			} 
	}, [])

	useEffect(() => {
		(async function(){
			let address = await fetchAddressList.getAddressList()
		})()
	}, [])

	return (
		<div ref={el => mapContainer = el} className={classes.mapContainer} />
	)
}


export default MapPage;