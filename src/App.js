import logo from "./logo.svg";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import "./App.css";
import { Marker, Popup } from "react-leaflet";
import Map from "./Component/Map/Map";

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
