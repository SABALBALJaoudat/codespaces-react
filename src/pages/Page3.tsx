import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface StationMeteo {
    id_numero: number;
    id_nom: string;
    longitude: number;
    latitude: number;
}

function Page3() {
    const mapContainer = useRef(null);

    const [userPosition, setUserPosition] = useState({ lng: 1.452060306, lat: 43.58843456 });
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = 'In2ch0rSI79Yg3PtnAus';

    const map = useRef<maptilersdk.Map | null>(null); // Update the type of the map ref

    const [stationsMeteo, setStationsMeteo] = useState<StationMeteo[]>([]);

    useEffect(() => {
        // Récupérer les données des stations météo
        fetch('https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/stations-meteo-en-place/records?select=longitude%2Clatitude%2Cid_numero%2Cid_nom&limit=100')
            .then(response => response.json())
            .then((data: { results: StationMeteo[] }) => {
                setStationsMeteo(data.results);
                console.log('data.results :', data.results);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []);

    const [markers, setMarkers] = useState<Array<maptilersdk.Marker>>([]);

    useEffect(() => {
        // Créer de nouveaux marqueurs et les ajouter à la carte
        const newMarkers = stationsMeteo.map(station => {
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'Map marker';
            const marker = new maptilersdk.Marker({ color: "#00FF00", clickTolerance: 1000 })
                .setLngLat([station.longitude, station.latitude])
                .setPopup(new maptilersdk.Popup().setHTML(`<h3>${station.id_nom}</h3><br/>longitude : ${station.longitude} / latitude : ${station.latitude}`))
                .addTo(map.current!);

            // Ajouter un gestionnaire d'événement de clic à chaque marqueur
            marker.on('click', function () {
                console.log('Marker cliqué :', station);
            });

            // Change the cursor to a pointer when the mouse is over the marker.
            marker.on('mouseenter', function () {
                map.current!.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            marker.on('mouseleave', function () {
                map.current!.getCanvas().style.cursor = '';
            });

            // console.log('Marker créé :', marker);

            return marker;
        });

        // Mettre à jour l'état avec les nouveaux marqueurs
        setMarkers(newMarkers);
    }, [stationsMeteo]);

    useEffect(() => {
        map.current?.remove();

        console.log("userPosition", userPosition)

        map.current = new maptilersdk.Map({
            container: mapContainer.current!,
            style: maptilersdk.MapStyle.STREETS,
            // center: [userPosition.lng, userPosition.lat],
            zoom: zoom,
            fullscreenControl: "top-left",
            terrainControl: true,
            pitch: 45,
            geolocate: true,
        });

        map.current.on('click', function (e) {
            // The event object (e) contains information like the
            // coordinates of the point on the map that was clicked.
            console.log('A click event has occurred at ' + e.lngLat);
        });

        console.log('map.current :', map.current);

        // map.current.addSource('some id', {
        //     type: 'geojson',
        //     data: {
        //         "type": "FeatureCollection",
        //         "features": [{
        //             "type": "Feature",
        //             "properties": {},
        //             "geometry": {
        //                 "type": "Point",
        //                 "coordinates": [
        //                     -76.53063297271729,
        //                     39.18174077994108
        //                 ]
        //             }
        //         }]
        //     }
        // });

    }, [userPosition]);

    return (
        <div className='page'>
            <h1>Maps</h1>
            <div className="map-wrap">
                <div ref={mapContainer} className="map" />
            </div>
        </div>
    )
}

export default Page3