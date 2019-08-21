import React, { Component } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { Constants, Notifications, Permissions } from "expo";
import { Button } from "react-native-elements";

export default class Notif extends Component {
  onSubmit() {
    const localNotification = {
      title: "done",
      body: "done!"
    };

    const schedulingOptions = {
      time: new Date().getTime() + Number(4)
    };

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  }

  handleNotification() {
    console.log("ehhhhh");

    console.warn("ok! got your notif");
  }

  async componentDidMount() {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    Notifications.addListener(this.handleNotification);
  }

  render() {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={this.onSubmit}
          style={{ backgroundColor: "white" }}
        >
          <Text>Envoyé</Text>
        </TouchableOpacity>
        <TextInput onSubmitEditing={this.onSubmit} placeholder={"time in ms"} />
      </View>
    );
  }
}
