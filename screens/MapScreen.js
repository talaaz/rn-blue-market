//https://pjanf.github.io/projects/2017/12/04/backend-01.html

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import * as productActions from "../store/actions/products";

const MapScreen = (props) => {
  const CondLat = props.navigation.getParam("CondLat");
  const CondLong = props.navigation.getParam("CondLong");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [concat, setConcat] = useState(null);
  const [coords, setCoords] = useState([]);
  const [x, setX] = useState("false");
  const [cordLatitude, setCordLatitude] = useState(CondLat);
  const [cordLongitude, setCordLongitude] = useState(CondLong);

  useEffect(() => {
    console.log("Firsst  func");

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setError(null);
      mergeLot();

      (error) => setError(error.message),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 };
    });
  }, []);

  const mergeLot = () => {
    console.log("merge lot func");
    if (latitude != null && longitude != null) {
      let concatLot = latitude + "," + longitude;
      useEffect(() => {
        getDirections(concatLot, { cordLatitude, cordLongitude });
      }, [concat]);
    }
  };

  useEffect(() => {
    console.log("getDirections func");
    async function getDirections(startLoc, destinationLoc) {
      try {
        let resp = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
        );
        let respJson = await resp.json();
        let points = Polyline.decode(
          respJson.routes[0].overview_polyline.points
        );
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        setCoords(coords);
        setX("true");
        return coords;
      } catch (error) {
        setX("error");
        return error;
      }
    }
    console.log("getDirections 1func");
  }, [coords]);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
    >
      {!!latitude && !!longitude && (
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={"Your Location"}
        />
      )}

      {!!cordLatitude && !!cordLongitude && (
        <MapView.Marker
          coordinate={{
            latitude: cordLatitude,
            longitude: cordLongitude,
          }}
          title={"Your Destination"}
        />
      )}

      {!!latitude && !!longitude && x == "true" && (
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={2}
          strokeColor="red"
        />
      )}

      {!!latitude && !!longitude && x == "error" && (
        <MapView.Polyline
          coordinates={[
            {
              latitude: latitude,
              longitude: longitude,
            },
            {
              latitude: cordLatitude,
              longitude: cordLongitude,
            },
          ]}
          strokeWidth={2}
          strokeColor="red"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
