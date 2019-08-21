import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import { iconActions } from "../../assets/icons";
import {
  allDistance,
  transformArrayForCordinate
} from "../../utils/calculDistance";
const { height, width } = Dimensions.get("window");

export const CardInfoPins = ({
  props,
  onPressLeft,
  onPressRight,
  infoPress,
  allTraject,
  indexElement
}) => {
  const cardByStatus = () => {
    if (props.status === "scale") {
      return (
        <View style={[styles.flexMidRange, styles.titleCenter]}>
          <Text style={styles.titleText}>
            {(props.info && props.info.name) || "Pause"}
          </Text>
          <Text style={styles.ratingText}>
            {(props.info && props.info.description) ||
              "C'est la pause profites un peu..."}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.flexMidRange, styles.titleCenter]}>
          <Text style={styles.titleText}>{nameForCenter(props.status)}</Text>
          <Text style={styles.ratingText}>
            {props.status !== "last"
              ? "Prochaine Pause dans " +
                nextPause(props, allTraject, indexElement)
              : "Félicitation !!"}
          </Text>
        </View>
      );
    }
  };

  const nextPause = (infoCard, allCard, indexElement) => {
    const newTabWithoutPrevious = allCard.filter(
      (el, index) => indexElement < index
    );
    const nextScaleIndex = newTabWithoutPrevious.findIndex(
      el => el.status === "scale" || el.status === "last"
    );
    const newtabJustInfoUtil = newTabWithoutPrevious.filter(
      (el, index) => index <= nextScaleIndex
    );

    let tabDistance = [
      infoCard.coordinate,
      ...transformArrayForCordinate(newtabJustInfoUtil)
    ];
    return allDistance(tabDistance);
  };

  const nameForCenter = name => {
    if (name === "ajust") {
      return "Checkpoint";
    }
    if (name == "home") {
      return "Départ";
    }
    if (name === "last") {
      return "Arrivé";
    } else {
      return name;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row"
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.buttonExternal,
          { opacity: infoPress === "start" ? 0 : 1 }
        ]}
        onPress={() => onPressLeft()}
      >
        <Image source={iconActions["arrow_left"]} style={styles.sizeImg} />
      </TouchableOpacity>
      {cardByStatus()}
      <TouchableOpacity
        style={[
          styles.buttonExternal,
          { opacity: infoPress === "end" ? 0 : 1 }
        ]}
        onPress={() => onPressRight()}
      >
        <Image source={iconActions["arrow_right"]} style={styles.sizeImg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    width: width - 20,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: Platform.OS === "android" ? 1.5 : 0,
    borderRadius: 10
  },
  flexMidRange: { flex: 0.6 },
  buttonExternal: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  sizeImg: { width: 40, height: 40 },

  subtitleView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleCenter: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  titleText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25
  }
});

export default CardInfoPins;

// colors Good
// #5359af
