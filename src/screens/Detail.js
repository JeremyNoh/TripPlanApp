import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";

function Detail({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

Detail.navigationOptions = () => ({
  headerTintColor: "black",
  headerStyle: {
    backgroundColor: "blueviolet"
  }
});

export default withNavigation(Detail);
