import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import * as Animatable from "react-native-animatable";

const { height, width } = Dimensions.get("window");

import { iconActions } from "../../assets/icons";

const FabSettings = ({ onPress }) => {
  const [IsActive, setIsActive] = useState(true);
  if (IsActive) {
    return (
      <>
        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 15 }]}
          onPress={() => {
            setIsActive(false), onPress("settings");
          }}
        >
          <Image source={iconActions["settings2"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 15, bottom :  20 +55 + 50 }]}
          onPress={() => {
            setIsActive(false), onPress("finish");
          }}
        >
          <Image source={iconActions["success"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon,  { right: 20 +55 +15  , bottom : 20 +50 +15  }]}
          onPress={() => {
            setIsActive(false), onPress("goBack");
          }}
        >
          <Image source={iconActions["goBack"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 20 +55 + 50 }]}
          onPress={() => {
            setIsActive(false), onPress("trash");
          }}
        >
          <Image source={iconActions["trash"]} style={styles.sizeImg} />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <TouchableOpacity
      style={styles.actionButtonIcon}
      onPress={() => {
        setIsActive(true), onPress("settings");
      }}
    >
      <Image source={iconActions["settings"]} style={styles.sizeImg} />
    </TouchableOpacity>
  );
};

export default FabSettings;

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  sizeImg: { width: 30, height: 30 }
});
