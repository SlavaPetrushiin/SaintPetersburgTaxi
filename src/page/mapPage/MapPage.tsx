import React, { useEffect, useState } from 'react';
//@ts-ignore
import mapboxgl from 'mapbox-gl';
import { getAddressesList } from '../../store/addresses/addresses';
import { Button, Card, makeStyles } from '@material-ui/core';
import SelectedUI from '../../components/UI/Select/SelectedUI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdmE5MXBldHJ1c2hpbiIsImEiOiJja2Y0YzZxb3cwNmg3MnJsY2M3cTBzYWtxIn0.NOIbmlQuifTg1sitvjGQ7w';

const useStyles = makeStyles(() => ({
	root: {
		width: 375,
		backgroundColor: '#ffffff',
		position: 'absolute',
		zIndex: 5,
		padding: 15,
		top: 70,
		left: 30
	},
	sidebarStyle: {
		display: 'inline-block',
		position: 'absolute',
		top: 0,
		left: 0,
		margin: 12,
		backgroundColor: '#404040',
		color: '#ffffff',
		zIndex: 1,
		padding: 6,
		fontWeight: 'bold'
	},
	mapContainer: {
		position: 'absolute',
		top: 60,
		left: 0,
		right: 0,
		bottom: 0
	}
}));

const MapPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [lng, setLng] = useState<number>(30.2656504);
	const [lat, setLat] = useState<number>(59.8029126);
	const [zoom, setZoom] = useState<number>(10);
	const addresses = useSelector((state: RootState) => state.addresses.addresses);

	let mapContainer = React.createRef() as any;

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		return function mapRemove() {
			map.remove()
		}
	}, [])

	useEffect(() => {
		dispatch(getAddressesList());
	}, [])

	return (
		<div ref={el => mapContainer = el} className={classes.mapContainer} >
			<Card className={classes.root}>
				<SelectedUI addresses={addresses} />
				<SelectedUI addresses={addresses} />
				<Button
					variant="contained"
					color="primary"
				>
					Send
				</Button>
			</Card>
		</div>
	)
}


export default MapPage;