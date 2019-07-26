import React from "react";
import Home from "./src/screens/Home";
import Add from "./src/screens/Add";
import Detail from "./src/screens/Detail";

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

const App = createStackNavigator({
  Home: {
    screen: Home
  },
  Add: {
    screen: Add
  },
  Detail: {
    screen: Detail
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App
    },
    {
      initialRouteName: "App"
    }
  )
);
