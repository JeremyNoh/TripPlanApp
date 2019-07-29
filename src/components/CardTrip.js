import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Platform,
  Animated,
  TouchableOpacity,
  Image
} from "react-native";
import { ListItem } from "react-native-elements";
import {
  transformArrayForCordinate,
  allDistance,
  nbrScale
} from "../../utils/calculDistance";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler/GestureHandler";
import { iconActions } from "../../assets/icons";

export const CardTrip = ({ props, onPress, onLongPress, deletePress }) => {
  // for the Distance
  const markersFormat = transformArrayForCordinate(props.markers);
  const distance = allDistance(markersFormat);

  const nbScale = nbrScale(props.markers);

  // for nbr obstacle

  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={() => {
          deletePress();
        }}
      >
        <Animated.Image
          source={iconActions["trash"]}
          style={[
            {
              transform: [{ translateX: trans }]
            },
            styles.sizeImg
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View
        style={{
          marginTop: 20,
          width: "90%",
          justifyContent: "center",
          elevation: 4,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "grey",
          shadowOpacity: 0.5,
          shadowRadius: 10
        }}
      >
        <Swipeable renderLeftActions={renderLeftActions}>
          <ListItem
            friction={90}
            tension={100}
            activeScale={0.95}
            title={props["name"].toUpperCase()}
            linearGradientProps={{
              colors: ["white", "white"],
              start: [1, 0],
              end: [0.2, 0]
            }}
            titleStyle={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center"
            }}
            subtitleStyle={{ color: "black" }}
            subtitle={
              <View>
                <View
                  style={{
                    alignItems: "center",
                    height: 3,

                    borderRadius: 20,
                    marginVertical: 10,
                    backgroundColor: "black"
                  }}
                />
                <View style={styles.subtitleView}>
                  <Text style={styles.ratingText}>{distance}</Text>
                  <Text style={styles.ratingText}>
                    {nbScale} Escale{nbScale > 1 ? "s" : null}
                  </Text>
                </View>
              </View>
            }
            containerStyle={{
              borderColor: "black",
              borderWidth: Platform.OS === "android" ? 1.5 : 0,
              borderRadius: Platform.OS === "android" ? 10 : 10
            }}
            onPress={() => onPress()}
            onLongPress={() => onLongPress()}
          />
        </Swipeable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    height: 100,
    marginTop: 30,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  subtitleView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  alignElement: {
    alignItems: "center"
  },
  ratingText: {
    fontWeight: "bold",
    color: "black"
  },
  leftAction: {
    backgroundColor: "#b6075d",
    borderColor: "black",
    borderWidth: Platform.OS === "android" ? 1.5 : 0,
    borderRadius: Platform.OS === "android" ? 10 : 10,
    // alignItems: "center",
    // alignContent: "center",
    paddingLeft: 5,
    justifyContent: "center"
  },
  sizeImg: { width: 40, height: 40 }
});

export default CardTrip;

// colors Good
// #5359af
