import React from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform
} from "react-native";
import { ListItem } from "react-native-elements";
import {
  transformArrayForCordinate,
  allDistance,
  nbrScale
} from "../../utils/calculDistance";

export const CardTrip = ({ props, onPress, onLongPress }) => {
  // for the Distance
  const markersFormat = transformArrayForCordinate(props.markers);
  const distance = allDistance(markersFormat);

  const nbScale = nbrScale(props.markers);

  // for nbr obstacle

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
                  {nbScale} obstacle{nbScale > 1 ? "s" : null}
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
  }
});

export default CardTrip;

// colors Good
// #5359af
