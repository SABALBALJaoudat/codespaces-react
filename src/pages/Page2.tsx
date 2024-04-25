import React, { useEffect, useState } from 'react'

interface StationMeteo {
    id_numero: number;
    id_nom: string;
    longitude: number;
    latitude: number;
}

function Page2() {
    const [stationsMeteo, setStationsMeteo] = useState<StationMeteo[]>([]);

    useEffect(() => {
        fetch('https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/stations-meteo-en-place/records?select=longitude%2Clatitude%2Cid_numero%2Cid_nom&limit=100')
            .then(response => response.json())
            .then((data: { results: StationMeteo[] }) => {
                setStationsMeteo(data.results);
                console.log('data.results :', stationsMeteo);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []);


    return (
        <div className='page'>
            <h1>Station météo</h1>
            <p>On va récupérer les valeurs des opendata de la ville</p>
            <ul>
                {stationsMeteo.map(station => (
                    <li key={station.id_nom}>{station.id_nom} : <br />
                        longitude : {station.longitude} / latitude : {station.latitude}</li>
                ))}
            </ul>
        </div>
    )
}

export default Page2