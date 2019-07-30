import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";

// Internal  Component | Function
import { mainColor } from "../../utils/colors";
import { iconPins } from "../../assets/icons";
import Container from "../components/Container";
import { transformArrayForCordinate } from "../../utils/calculDistance";
import DistanceButton from "../components/DistanceCard";
import CardInfoPins from "../components/CardInfoPins";
const { height, width } = Dimensions.get("window");

function Detail({ navigation }) {
  // init markers from Params
  initMarkers = () => {
    let trip = navigation.getParam("tripParam", {});
    return trip.hasOwnProperty("markers") ? trip.markers : [];
  };
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  // postion of the user
  const [InitialRegion, setInitialRegion] = useState(undefined);

  // ALl the MarkersPosition | Description
  const [Markers, setMarkers] = useState(initMarkers());

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      // AsyncStorage.clear();
      permissionLocation();
      setFirstInApp(false);
    }
  });

  // ask Permission and Set to the First Pin
  const permissionLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let InitialRegion = {
          latitude: Markers[0].coordinate.latitude,
          longitude: Markers[0].coordinate.longitude,
          latitudeDelta: 0.00592,
          longitudeDelta: 0.00521
        };
        setInitialRegion(InitialRegion);
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  // move the Map From the Cordinate
  const goToPin = coordinatePins => {
    this.map.animateToRegion(
      {
        latitude: coordinatePins.latitude,
        longitude: coordinatePins.longitude,
        latitudeDelta: InitialRegion.latitudeDelta,
        longitudeDelta: InitialRegion.longitudeDelta
      },
      350
    );
  };

  const onMarkerPress = e => {};

  // LoadPMap
  if (!InitialRegion) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  return (
    <Container style={{ backgroundColor: mainColor }}>
      <MapView
        style={[styles.mapStyle]}
        initialRegion={InitialRegion}
        ref={map => (this.map = map)}
        showsUserLocation
        loadingEnabled
        followUserLocation
      >
        {Markers.map((marker, index) => {
          return (
            <Marker {...marker} key={index}>
              <Image
                source={iconPins[marker.pin]}
                style={{ width: 50, height: 50 }}
                onPress={e => {
                  e.stopPropagation();
                  onMarkerPress(i);
                }}
              />
              {marker.info && (
                <Callout>
                  <View {...marker} style={styles.marker}>
                    <Text style={styles.text}>{marker.info.name}</Text>
                  </View>
                </Callout>
              )}
            </Marker>
          );
        })}

        {Markers && (
          <Polyline
            coordinates={transformArrayForCordinate(Markers)}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000"
            ]}
            strokeWidth={6}
          />
        )}
      </MapView>
      <ScrollView
        horizontal={true}
        scrollEnabled={false}
        ref={ref => (this.myScroll = ref)}
        style={{
          position: "absolute",
          bottom: 20,
          left: 10,
          height: 100
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {Markers.map((element, index) => {
          return (
            <CardInfoPins
              key={index}
              indexElement={index}
              props={element}
              onPressRight={() => {
                this.myScroll.scrollTo({
                  x: (index + 1) * (width - 20),
                  y: 0,
                  animated: true
                });
                goToPin(
                  Markers[
                    index === Markers.length - 1
                      ? Markers.length - 1
                      : index + 1
                  ].coordinate
                );
              }}
              allTraject={Markers}
              infoPress={
                index === 0
                  ? "start"
                  : index === Markers.length - 1
                  ? "end"
                  : "mid"
              }
              onPressLeft={() => {
                this.myScroll.scrollTo({
                  x: (index - 1) * (width - 20),
                  y: 0,
                  animated: true
                });
                goToPin(Markers[index === 0 ? 0 : index - 1].coordinate);
              }}
            />
          );
        })}
      </ScrollView>

      <DistanceButton markers={transformArrayForCordinate(Markers)} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});

Detail.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("tripParam", "TripName").name,
  headerTintColor: "black",
  headerStyle: {
    backgroundColor: "blueviolet"
  }
});

export default withNavigation(Detail);
