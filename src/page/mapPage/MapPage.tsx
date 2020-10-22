import React, { useEffect, useState } from 'react';
//@ts-ignore
import mapboxgl from 'mapbox-gl';
import { getAddressesList } from '../../store/addresses/addresses';
import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import SelectedUI from '../../components/UI/Select/SelectedUI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import validSelected from '../../utilites/validSelected';
import fetchAddressList, { СoordinateType } from '../../api/addressList';

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

type PropsRouteUserType = {
	from: string
	where: string
	addresses: string[]
	onChangeField: (street: string, name: string) => void
	handleClickOrder: () => void
}

const RouteUser: React.FC<PropsRouteUserType> = ({ addresses, from, where, onChangeField, handleClickOrder }): JSX.Element => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<SelectedUI addresses={addresses} onChangeField={onChangeField} street={from} name={'from'} />
			<SelectedUI addresses={addresses} onChangeField={onChangeField} street={where} name={'where'} />
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickOrder}
				disabled={from.length && where.length ? false : true}
			>
				Заказать
			</Button>
		</Card>
	)
}


const MapPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const addresses = useSelector((state: RootState) => state.addresses.addresses);
	const [lng, setLng] = useState<number>(30.2656504);
	const [lat, setLat] = useState<number>(59.8029126);
	const [zoom, setZoom] = useState<number>(10);
	const [from, setForm] = useState<string>('');
	const [where, setWhere] = useState<string>('');
	const [streets, setStreets] = useState<string[]>(addresses);
	const [map, setMap] = useState<any>(null);
	const [route, setRoute] = useState<СoordinateType[]>([]);
	const [hideInfo, setHideInfo] = useState(true);

	let mapContainer = React.createRef() as any;

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		setMap(map);

		return function mapRemove() {
			map.remove()
		}
	}, [])

	useEffect(() => {
		dispatch(getAddressesList());
	}, [])

	useEffect(() => {
		setStreets(addresses);
	}, [addresses]);

	useEffect(() => {
		drawRoute();
	}, [route])

	const drawRoute = (): void => {
		if (!map) return;

		if (!route.length) {
			map.removeLayer("route");
			map.removeSource("route");
			return;
		}

		map.flyTo({
			center: route[0],
			zoom: 15,
		})

		map.addLayer({
			id: 'route',
			type: 'line',
			paint: {
				'line-width': 6,
				'line-color': '#FFD700'
			},
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			source: {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: "LineString",
						coordinates: route,
					},
				}
			}
		})
	}

	const onChangeStreet = (street: string, name: string): void => {
		switch (name) {
			case 'from': {
				validSelected(addresses, street, 'from', where, setForm, setStreets);
				return
			}
			case 'where': {
				validSelected(addresses, street, 'where', from, setWhere, setStreets);
				return;
			}
		}
	};

	const handleClickOrder = async () => {
		const route = await fetchAddressList.getСoordinateRoute(from, where);
		setRoute(route);
		setHideInfo(false);
		setWhere('');
		setForm('');
	}

	const handleClickNewOrder = (): void => {
		setHideInfo(true);
		setRoute([]);
		setStreets(addresses);
	}

	return (
		<div ref={el => mapContainer = el} className={classes.mapContainer} >
			{
				hideInfo
					? <RouteUser
							from={from}
							where={where}
							addresses={streets}
							onChangeField={onChangeStreet}
							street={from}
							handleClickOrder={handleClickOrder}
						/>
					: (
						<Card className={classes.root}>
							<Typography variant="h6" gutterBottom>
								Заказ размещён
						</Typography>
							<Typography variant="subtitle1" gutterBottom>
								Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут
						</Typography>
							<Button
								variant="contained"
								color="primary"
								onClick={handleClickNewOrder}
							>
								Сделать новый заказ
						</Button>
						</Card>
					)
			}
		</div>
	)
}


export default MapPage;