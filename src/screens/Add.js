import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import * as Animatable from "react-native-animatable";

// Internal  Component | Function
import { mainColor } from "../../utils/colors";
import { iconPins } from "../../assets/icons";
import { PromptScale } from "../components/PromptScale";
import FabSettings from "../components/FabSettings";
import Container from "../components/Container";
import {
  transformArrayForCordinate,
  randomId
} from "../../utils/calculDistance";
import DistanceButton from "../components/DistanceCard";

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

  const [Markers, setMarkers] = useState(initMarkers());
  // Postion of the Marker

  //Info of My pin
  const [InfoScale, setInfoScale] = useState({
    isVisibleModal: false
  });

  // Trigger if BottomMenu is actived
  const [ActiveMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      // AsyncStorage.clear();
      permissionLocation();
      setFirstInApp(false);
    }
  });

  // Alert for user choose Pins in Maps
  alertChoicePins = pin => {
    const questionAlert = [];
    if (Markers.length === 0) {
      questionAlert.push({
        text: `Départ`,
        onPress: () => {
          escalePins(pin, "home");
        }
      });
    } else {
      questionAlert.push(
        ...[
          {
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
          }
        ]
      );
    }

    questionAlert.push({
      text: `Annuler`,
      onPress: () => {}
    });

    Alert.alert("Que veux-tu faire ?", "", questionAlert, { cancelable: true });
  };

  // setInfo status in Pin
  const escalePins = (pin, status) => {
    if (status === "home") {
      pin.pin = "pin_home";
    } else if (status === "scale") {
      pin.pin = "pin_scale";
      setInfoScale({ isVisibleModal: true });
    } else if (status === "ajust") {
      pin.pin = "pin2";
    } else if (status === "last") {
      pin.pin = "pin_finish";
    }
    pin.status = status;
    setMarkers([...Markers, pin]);
  };

  // set Name and Description on the ScalePin
  const infoPins = () => {
    let ObjInfoScale = {
      description: InfoScale.description,
      name: InfoScale.name
    };
    let markers = Markers;
    markers[markers.length - 1].info = ObjInfoScale;
    setMarkers([...markers]);
  };

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

  const clickOnMap = e => {
    let pin = {
      coordinate: e.nativeEvent.coordinate
    };
    alertChoicePins(pin);
  };

  const onMarkerPress = e => {};

  // Action of All Icon Settings
  actionDispatch = status => {
    if (status === "trash") {
      setMarkers([]);
    } else if (status === "goBack") {
      let markers = Markers;
      markers.pop();
      setMarkers(markers);
    } else if (status === "finish") {
      let trip = navigation.getParam("tripParam", {});

      // load the Obj for Push
      let ObjFinish = {
        name: trip.name,
        markers: Markers,
        id: trip.hasOwnProperty("id") ? trip["id"] : randomId()
      };

      // retrieve info From AsyncStorage
      AsyncStorage.getItem("infoTrip", (err, result) => {
        let infoTrip = JSON.parse(result);
        let data = [];

        // if AsyncStorage not Empty
        if (infoTrip) {
          const ExistElementIndex = infoTrip.findIndex(el => {
            return el.id === ObjFinish.id;
          });
          // d'ont exist on LocalStorage
          if (ExistElementIndex === -1) {
            data = [...infoTrip, ObjFinish];
          } else {
            data = infoTrip;
            data[ExistElementIndex] = ObjFinish;
          }
        } else {
          data = [ObjFinish];
        }

        AsyncStorage.setItem("infoTrip", JSON.stringify(data), () => {
          navigation.goBack();
        });
      });
    }
  };

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
          infoPins();
        }}
      />
      <MapView
        style={[styles.mapStyle, { bottom: ActiveMenu ? 100 : 50 }]}
        initialRegion={InitialRegion}
        showsUserLocation
        loadingEnabled
        followUserLocation
        onPress={clickOnMap}
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
      <FabSettings
        onPress={status => {
          setActiveMenu(!ActiveMenu), actionDispatch(status);
        }}
      />
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
    bottom: 100,
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
