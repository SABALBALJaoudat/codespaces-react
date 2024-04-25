import React, { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

function Page4() {
    // set intial state - used to track references to OpenLayers 
    //  objects for use in hooks, event handlers, etc.
    const [map, setMap] = useState()
    // const [featuresLayer, setFeaturesLayer] = useState()
    // const [selectedCoord, setSelectedCoord] = useState()

    // get ref to div element - OpenLayers will render into this div
    const mapElement = useRef(null);

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect(() => {

        // create and add vector source layer
        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource()
        })

        // create map
        const map = new Map({
            target: mapElement.current!,
            layers: [

                // USGS Topo
                new TileLayer({
                    source: new XYZ({
                        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                    })
                }),

                initalFeaturesLayer

            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2
            }),
            controls: []
        })

        // save map and vector layer references to state
        // setMap(map)
        // setFeaturesLayer(initalFeaturesLayer)

    }, [])

    return (
        <div className='page'>
            <h1>OpenLayer</h1>

            <div ref={mapElement} className="map-container" style={{ width: "100%", height: "1000px" }}></div>
        </div>
    )
}

export default Page4