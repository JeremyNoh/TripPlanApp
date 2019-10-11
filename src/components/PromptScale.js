import React from "react";

import {
  View,
  StyleSheet,
  Platform,
  Modal,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { mainColor } from "../../utils/colors";

export const PromptScale = ({
  defaultValue,
  onSubmit,
  onCancel,
  errorText,
  isVisible,
  onBackButtonPress,
  onChangeText,
  primaryColor = mainColor,
  promptBoxStyle,
  headingStyle,
  inputStyle,
  btnStyle,
  btnTextStyle,
  promptAnimation = "fade",
  cancelText ="Annuler",
  onSubmitText = "Valider",
  ...inputProps
}) => {
  return (
    <Modal
      animationType={promptAnimation}
      hardwareAccelerated
      transparent
      visible={isVisible}
      onRequestClose={onBackButtonPress}
    >
      <View style={styles.container}>
        <View style={[styles.promptBox, promptBoxStyle]}>
          <Text
            style={[styles.heading, headingStyle]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Info de l'étape
          </Text>
          <TextInput
            placeholder="Nom de l'étape"
            defaultValue={defaultValue}
            underlineColorAndroid={primaryColor}
            style={[
              { borderBottomColor: primaryColor },
              styles.promptInput,
              inputStyle,
              { marginBottom: 10 }
            ]}
            onChangeText={text => onChangeText(text, "name")}
            {...inputProps}
          />

          <TextInput
            {...inputProps}
            placeholder="Entre une Description"
            defaultValue={defaultValue}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid={primaryColor}
            style={[
              { borderColor: primaryColor },
              styles.promptInput,
              inputStyle,
              { height: 100, borderWidth: Platform.OS === "ios" ? 1.5 : 0 }
            ]}
            onChangeText={text => onChangeText(text, "description")}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.promptBtn, btnStyle]}
              onPress={onCancel}
            >
              <Text
                style={[{ color: primaryColor }, styles.btnTxt, btnTextStyle]}
              >
                {cancelText}

              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.promptBtn, btnStyle]}
              onPress={onSubmit}
            >
              <Text
                style={[{ color: primaryColor }, styles.btnTxt, btnTextStyle]}
              >
                {onSubmitText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const COLORS = {
  primaryColor: "#f13a59",
  black: "#000000",
  white: "#FFFFFF",
  transparent: "transparent",
  red: "#FF0000",
  mainColor: mainColor,
  grey: "#dddddd",
  translucent: "rgba(0,0,0,0.5)"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.translucent
  },
  promptBox: {
    width: "90%",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
    padding: 10,
    borderRadius: 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.8,
    elevation: 8
  },
  heading: {
    color: COLORS.Black,
    fontSize: 23,
    marginBottom: 20
  },
  promptInput: {
    width: "90%",
    height: 50,
    fontSize: 20,
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: Platform.OS === "ios" ? 1.5 : 0
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10
  },
  promptBtn: {
    width: "50%",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  errorContainer: {
    marginTop: 10,
    width: "100%",
    minHeight: 20
  },
  errorText: {
    marginLeft: 20,
    color: COLORS.red,
    textAlign: "left"
  },
  btnTxt: {
    textAlign: "center",
    fontSize: 20
  }
});
