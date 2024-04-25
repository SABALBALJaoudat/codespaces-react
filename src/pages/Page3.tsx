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
    // const map = useRef(null);
    const [userPosition, setUserPosition] = useState({ lng: 1.452060306, lat: 43.58843456 });
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = 'In2ch0rSI79Yg3PtnAus';

    const map = useRef<maptilersdk.Map | null>(null); // Update the type of the map ref

    const [stationsMeteo, setStationsMeteo] = useState<StationMeteo[]>([]);

    useEffect(() => {
        // Fonction de récupération de la localisation de l'utilisateur
        const getUserLocation = () => {
            // Vérifie si le navigateur prend en charge la géolocalisation
            if (navigator.geolocation) {
                // Demande la position de l'utilisateur
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setUserPosition({ lng: position.coords.longitude, lat: position.coords.latitude });
                        console.log('Localisation de l\'utilisateur selon le site :', position.coords.longitude, position.coords.latitude);
                    },
                    error => {
                        console.error('Erreur de géolocalisation :', error);
                    }
                );
            } else {
                console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
            }
        };

        // Appel de la fonction pour récupérer la localisation de l'utilisateur
        getUserLocation();

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
            const marker = new maptilersdk.Marker({ color: "#00FF00" })
                .setLngLat([station.longitude, station.latitude])
                .setPopup(new maptilersdk.Popup().setHTML(`<h3>${station.id_nom}</h3><br/>longitude : ${station.longitude} / latitude : ${station.latitude}`))
                .addTo(map.current!);

            return marker;
        });

        // Mettre à jour l'état avec les nouveaux marqueurs
        setMarkers(newMarkers);
    }, [stationsMeteo]);

    useEffect(() => {
        // if (map.current) return;
        map.current?.remove();

        console.log("userPosition", userPosition)

        map.current = new maptilersdk.Map({
            container: mapContainer.current!,
            style: maptilersdk.MapStyle.STREETS,
            center: [userPosition.lng, userPosition.lat],
            zoom: zoom,
            fullscreenControl: "top-left",
            terrainControl: true,
            // bearing: 50,
            pitch: 45,
        });

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