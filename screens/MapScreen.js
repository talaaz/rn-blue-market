//https://pjanf.github.io/projects/2017/12/04/backend-01.html

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
//import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  //Get lat and long of Product
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

  //Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setError(null);
      mergeLot();

      (error) => setError(error.message),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 };
    });
  }, []);

  //Calculate the distance between user location and product location
  const mergeLot = () => {
    if (latitude != null && longitude != null) {
      let concatLot = latitude + "," + longitude;
      useEffect(() => {
        getDirections(concatLot, { cordLatitude, cordLongitude });
      }, [concat]);
    }
  };

  //get directions using google api
  useEffect(() => {
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
    getDirections();
    console.log("getDirections 1func");
  }, [coords]);

  return (
    //Shows map
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 55.6786,
        longitude: 12.5635,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
    >
      {!!latitude && !!longitude && (
        //Shows user location marker
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={"Your Location"}
        />
      )}

      {!!cordLatitude && !!cordLongitude && (
        //Shows product location marker
        <MapView.Marker
          coordinate={{
            latitude: cordLatitude,
            longitude: cordLongitude,
          }}
          title={"Your Destination"}
        />
      )}

      {!!latitude && !!longitude && x == "true" && (
        //Draws red line between locations
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={2}
          strokeColor="red"
        />
      )}

      {!!latitude && !!longitude && x == "error" && (
        //Draws red line between locations
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
    backgroundColor: Colors.backgroundColor,
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
