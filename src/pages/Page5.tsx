import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { LngLat } from 'maplibre-gl';

interface StationMeteo {
    id_numero: number;
    id_nom: string;
    longitude: number;
    latitude: number;
}

function Page5() {

    const weatherLayers = {
        "precipitation": {
            "layer": null,
            "value": "value",
            "units": " mm"
        },
        "pressure": {
            "layer": null,
            "value": "value",
            "units": " hPa"
        },
        "radar": {
            "layer": null,
            "value": "value",
            "units": " dBZ"
        },
        "temperature": {
            "layer": null,
            "value": "value",
            "units": "°"
        },
        "wind": {
            "layer": null,
            "value": "speedMetersPerSecond",
            "units": " m/s"
        }
    };

    const mapContainer = useRef(null);

    const [userPosition, setUserPosition] = useState({ lng: 1.452060306, lat: 43.58843456 });
    const [zoom] = useState(15);
    maptilersdk.config.apiKey = 'In2ch0rSI79Yg3PtnAus';

    const map = useRef<maptilersdk.Map | null>(null); // Update the type of the map ref

    const [stationsMeteo, setStationsMeteo] = useState<StationMeteo[]>([]);
    const initWeatherLayer = "wind";

    const timeInfoContainer = document.getElementById("time-info");
    const timeTextDiv = document.getElementById("time-text");
    const timeSlider = document.getElementById("time-slider");
    const playPauseButton = document.getElementById("play-pause-bt");
    const pointerDataDiv = document.getElementById("pointer-data");
    let pointerLngLat = null;
    let activeLayer: string | number = "";
    let isPlaying = false;
    let currentTime = null;

    // function updatePointerValue(lngLat: LngLat) {
    //     if (!lngLat) return;
    //     pointerLngLat = lngLat;
    //     const weatherLayer = weatherLayers[activeLayer]?.layer;
    //     const weatherLayerValue = weatherLayers[activeLayer]?.value;
    //     const weatherLayerUnits = weatherLayers[activeLayer]?.units;
    //     if (weatherLayer) {
    //         const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
    //         if (!value) {
    //             pointerDataDiv!.innerText = "";
    //             return;
    //         }
    //         pointerDataDiv!.innerText = `${value[weatherLayerValue].toFixed(1)}${weatherLayerUnits}`
    //     }
    // }

    // function initWeatherMap(type) {
    //     const weatherLayer = changeWeatherLayer(type);
    // }

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

        map.current.on('load', function () {
            map.current!.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
            // initWeatherMap(initWeatherLayer);
        });

        map.current.on('mouseout', function (evt) {
            if (!evt.originalEvent.relatedTarget) {
                // pointerDataDiv.innerText = "";
                pointerLngLat = null;
            }
        });

        map.current.on('mousemove', (e) => {
            // updatePointerValue(e.lngLat);
        });

        document.getElementById('buttons')!.addEventListener('click', function (event) {
            // Change layer based on button id
            // changeWeatherLayer(event.target.id);
        });

    }, []);

    return (
        <div className='page'>
            <h1>Maps</h1>
            <div className="map-wrap">
                <div ref={mapContainer} className="map">
                    <ul id="buttons">
                        <li id="precipitation" className="btn btn-primary button">Precipitation</li>
                        <li id="pressure" className="btn btn-primary button">Pressure</li>
                        <li id="radar" className="btn btn-primary button">Radar</li>
                        <li id="temperature" className="btn btn-primary button">Temperature</li>
                        <li id="wind" className="btn btn-primary button">Wind</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Page5