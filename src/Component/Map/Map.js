import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";
import "leaflet-control-geocoder";

const Map = () => {
  useEffect(() => {
    const key = "wOfw9bFmGWRYhLnGTOfQ";
    const map = L.map("map").setView([30.3753, 69.3451], 6);

    const tileLayer = L.tileLayer(
      `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${key}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        crossOrigin: true,
      }
    );

    tileLayer.addTo(map);

    // Add geocoding control
    const geocodeControl = L.Control.geocoder({
      position: "topright",
      placeholder: "Search for a location...",
      defaultMarkGeocode: false,
      geocoder: L.Control.Geocoder.nominatim({
        key: key,
        language: "en", // Set the language to English
      }),
    }).addTo(map);

    // Variable to store the markers
    let searchMarker;
    let clickMarker;

    // Event listener for map click
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      // Remove the existing click marker if any
      if (clickMarker) {
        map.removeLayer(clickMarker);
      }

      // Create a red marker at the clicked location
      clickMarker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: "custom-marker",
          iconSize: [20, 20],
          html: '<div style="background-color: red; border-radius: 50%; width: 100%; height: 100%;"></div>',
        }),
      });

      // Add the click marker to the map
      clickMarker.addTo(map);

      // Pan the map to the clicked location without changing the zoom level
      map.panTo([lat, lng]);
    });

    geocodeControl.on("markgeocode", (event) => {
      const { center, name } = event.geocode || {};
      if (center) {
        // Remove the existing search marker if any
        if (searchMarker) {
          map.removeLayer(searchMarker);
        }

        // Create a red marker at the searched location
        searchMarker = L.marker(center, {
          icon: L.divIcon({
            className: "custom-marker",
            iconSize: [20, 20],
            html: '<div style="background-color: red; border-radius: 50%; width: 100%; height: 100%;"></div>',
          }),
        });

        // Add a pop-up with latitude and longitude
        searchMarker.bindPopup(
          `<b>${name}</b><br>Latitude: ${center.lat.toFixed(
            6
          )}<br>Longitude: ${center.lng.toFixed(6)}`
        );

        // Add the search marker to the map
        searchMarker.addTo(map);

        // Open the pop-up by default
        searchMarker.openPopup();

        // Zoom in on the searched location without panning
        map.setView(center, 12);

        // You can use the 'name' variable to display information about the location
        console.log("Clicked on:", name);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <a
        href="https://www.maptiler.com"
        style={{
          position: "absolute",
          left: "10px",
          bottom: "10px",
          zIndex: "999",
        }}
      >
        <img
          src="https://api.maptiler.com/resources/logo.svg"
          alt="MapTiler logo"
        />
      </a>
      <p>
        <a href="https://www.maptiler.com/copyright/" target="_blank">
          &copy; MapTiler
        </a>
        <a href="https://www.openstreetmap.org/copyright" target="_blank">
          &copy; OpenStreetMap contributors
        </a>
      </p>
    </div>
  );
};

export default Map;
