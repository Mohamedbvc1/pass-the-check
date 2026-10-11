import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // add your own key in client/.env
    version: "weekly"
});

function SearchRestaurantOnMap( { name, address } ) {
    // const [restaurantName, setRestaurantName] = useState('');
    // const [restaurantAddress, setRestaurantAddress] = useState('');
    let [map, setMap] = useState(null);
    let [marker, setMarker] = useState(null);
    const [targetRoute, setTargetRoute] = useState();
    
    function searchRestaurant(rName, rAddr) {
        const restaurantName = rName;
        const restaurantAddress = rAddr;

        const query = `${restaurantName} ${restaurantAddress}`;
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ 'address': query }, async function(results, status) {
            if(status == 'OK' && results[0]) {
                const location = results[0].geometry.location;
                const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

                map.setCenter(location);
                map.setZoom(18)

                if (marker) {
                    setMarker(new AdvancedMarkerElement({
                        map,
                        position: location,
                        title: restaurantName
                    }));
                }
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }

    useEffect(() => {
        loader.load().then(async () => {
            const { Map } = await window.google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

            setMap(new Map(document.getElementById("map"), {
                center: { lat: 51.0501, lng: -114.0853 },
                zoom: 11,
                mapId: "4504k8b37365d3d0",
            }));

            setMarker(new AdvancedMarkerElement({
                map,
            }));
        });
    }, []);

    useEffect(() => {
        if(map) {
            searchRestaurant(name, address);
        }
    }, [map])

    return (
        <>
            {/*<button onClick={searchRestaurant}>Search</button> */}
            <div id="map" style={{ height: '40em', width: '100%', backgroundColor:'blue'}}></div>
        </>
    )
}

export default SearchRestaurantOnMap