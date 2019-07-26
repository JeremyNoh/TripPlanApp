import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { mainColor } from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { iconActions, iconPins } from "../../assets/icons";
import { PromptScale } from "../components/PromptScale";

function Detail({ navigation }) {
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  // postion of the user
  const [InitialRegion, setInitialRegion] = useState(undefined);

  // Postion of the Marker
  const [Markers, setMarkers] = useState([]);

  //Info of My pin
  const [InfoScale, setInfoScale] = useState({
    isVisibleModal: false
  });

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      permissionLocation();
      setFirstInApp(false);
    }
  });

  alertChangeLangue = pin => {
    const questionAlert = [
      Markers.length === 0
        ? {
            text: `Départ`,
            onPress: () => {
              escalePins(pin, "home");
            }
          }
        : {
            text: `Faire Un Escale`,
            onPress: () => {
              escalePins(pin, "scale");
            }
          },
      {
        text: `Ajuster Ton Chemin`,
        onPress: () => {
          escalePins(pin, "ajust");
        }
      },
      {
        text: `Arriver`,
        onPress: () => {
          escalePins(pin, "last");
        }
      },
      {
        text: `Annuler`,
        onPress: () => {}
      }
    ];

    Alert.alert("Que veux-tu faire ?", "", questionAlert, { cancelable: true });
  };

  const escalePins = (pin, status) => {
    if (status === "home") {
      pin.pin = "pin_home";
    } else if (status === "scale") {
      pin.pin = "pin_scale";
    } else if (status === "ajust") {
      pin.pin = "pin2";
    } else if (status === "last") {
      pin.pin = "pin_finish";
    }
    pin.status = status;
    setMarkers([...Markers, pin]);
  };

  const deleteLastPin = () => {};

  // ask Permission
  const permissionLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let InitialRegion = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        setInitialRegion(InitialRegion);
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  const transformArrayForPolyline = val => {
    if (val.length === 0) {
      return [];
    }
    const res = val.map(el => {
      return {
        latitude: el.coordinate.latitude,
        longitude: el.coordinate.longitude
      };
    });
    return res;
  };

  const handlePress = e => {
    let pin = {
      coordinate: e.nativeEvent.coordinate
    };
    alertChangeLangue(pin);
  };

  const onMarkerPress = e => {
    console.log("deddede");
  };

  // LoadPMap
  if (!InitialRegion) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }
  console.log(InfoScale);

  return (
    <>
      <PromptScale
        isVisible={InfoScale.isVisibleModal}
        onChangeText={(value, status) => {
          setInfoScale({ ...InfoScale, [status]: value });
        }}
        onCancel={() => {
          setInfoScale({ isVisibleModal: false });
        }}
        onSubmit={() => {
          setInfoScale({ ...InfoScale, isVisibleModal: false });
        }}
      />
      <MapView
        style={styles.mapStyle}
        initialRegion={InitialRegion}
        showsUserLocation
        loadingEnabled
        followUserLocation
        onPress={handlePress}
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
              <Callout>
                <View {...marker} style={styles.marker}>
                  <Text style={styles.text}>Title pin</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}

        {Markers && (
          <Polyline
            coordinates={transformArrayForPolyline(Markers)}
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
    </>
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
  title: navigation.getParam("NameTrip", "TripName"),
  headerTintColor: "black",
  headerStyle: {
    backgroundColor: "blueviolet"
  }
});

export default withNavigation(Detail);
