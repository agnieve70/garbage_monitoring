import React, { useEffect, useRef } from 'react'
import { mapbox_key } from "../MAPBOX_KEY";
import mapboxgl from "!mapbox-gl"; /* eslint import/no-webpack-loader-syntax: off */

mapboxgl.accessToken = mapbox_key;
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

let myLocation;

function showPosition(position) {
  myLocation = [position.coords.longitude, position.coords.latitude];
  console.log("MY LOCATION: ", myLocation);
}

function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [125.353126, 6.747468],
          zoom: 14,
        });
    
        async function getRoute() {
          const query = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/digos.json?proximity=125.439376,6.868175&access_token=${mapboxgl.accessToken}`,
            { method: "GET" }
          );
          const json = await query.json();
          console.log(json);
        }
    
        getRoute();
    
        const geojson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                message: "fafafa",
                type: "serious_concern",
                iconSize: [30, 45],
              },
              geometry: {
                type: "Point",
                coordinates: [125.354278, 6.751162],
              },
            },
            {
              type: "Feature",
              properties: {
                message: "Foo",
                type: "general_concern",
                iconSize: [30, 45],
              },
              geometry: {
                type: "Point",
                coordinates: [125.353126, 6.747468],
              },
            },
            {
              type: "Feature",
              properties: {
                message: "Bar",
                type: "serious_concern",
                iconSize: [30, 45],
              },
              geometry: {
                type: "Point",
                coordinates: [125.364377, 6.749088],
              },
            },
            {
              type: "Feature",
              properties: {
                message: "Baz",
                type: "general_concern",
                iconSize: [30, 45],
              },
              geometry: {
                type: "Point",
                coordinates: [125.347801, 6.744144],
              },
            },
          ],
        };
    
        for (const marker of geojson.features) {
          // Create a DOM element for each marker.
          const el = document.createElement("div");
          const width = marker.properties.iconSize[0];
          const height = marker.properties.iconSize[1];
          el.className = "marker";
    
          el.style.backgroundImage = `url(./${marker.properties.type}.png)`;
          // el.style.color = "#198754";
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
          el.style.backgroundSize = "100%";
    
          el.addEventListener("click", () => {
            alert("Test");
          });
    
          console.log(el);
          // Add markers to the map.
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map.current);
        }
    
        //  #dc3545 if serious concern
        // const marker = new mapboxgl.Marker({
        //   color: "#198754",
        //   draggable: false,
        // })
        //   .setLngLat([125.355507, 6.75072])
        //   .addTo(map.current);
    
        // console.log(marker);
      }, []);

  return (
    <div ref={mapContainer} className="map-container" />
  )
}

export default Map