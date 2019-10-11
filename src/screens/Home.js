import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from "react-native";
import { withNavigation, NavigationEvents } from "react-navigation";
import { AppLoading } from "expo";
import Container from "../components/Container";
import Title from "../components/Title";
import CardTrip from "../components/CardTrip";
import AddButton from "../components/AddButton";
import { mainColor } from "../../utils/colors";
import { Prompt } from "../components/Prompt";

function Home({ navigation }) {
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  const [InfoTrip, setInfoTrip] = useState(undefined);
  const [NameTrip, setNameTrip] = useState({
    isVisibleModal: false
  });

  const [CanRefreshTrip, setCanRefreshTrip] = useState(false);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      getTrip();
      setFirstInApp(false);
    }

    if (CanRefreshTrip) {
      getTrip();
      setCanRefreshTrip(false);
    }
  });

  const removeTrip = (trip, index) => {
    let data = InfoTrip;
    data.splice(index, 1);
    AsyncStorage.setItem("infoTrip", JSON.stringify(data), () => {
      getTrip();
    });
  };

  const getTrip = async () => {
    const infoTripJson = await AsyncStorage.getItem("infoTrip");
    let infoTrip = JSON.parse(infoTripJson);
    setInfoTrip(infoTrip);

    // FOR THE TEST
    // navigation.navigate("Add", { tripParam: infoTrip[0] });
  };
  if (InfoTrip === undefined) {
    return <AppLoading />;
  }

  const listTrip = () => {
    return (
      <ScrollView
        style={{
          marginTop: 10
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {InfoTrip.map((element, index) => {
          return (
            <CardTrip
              key={index}
              props={element}
              onPress={() => {
                navigation.navigate("Detail", { tripParam: element });
              }}
              onLongPress={() => {
                navigation.navigate("Add", { tripParam: element });
              }}
              deletePress={() => {
                removeTrip(element, index);
              }}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"Tes Trajets"} />
      </View>
      <NavigationEvents
        onWillFocus={() => setCanRefreshTrip(!CanRefreshTrip)}
      />

      {InfoTrip ? (
        listTrip()
      ) : (
        <View style={styles.alignElement}>
          <Text>Ajoutes un Trajet 😄 </Text>
        </View>
      )}
      <Prompt
        isVisible={NameTrip.isVisibleModal}
        title="Nom du Parcours"
        onChangeText={name => {
          setNameTrip({ ...NameTrip, name });
        }}
        onCancel={() => {
          setNameTrip({ isVisibleModal: false });
        }}
        placeholder="Entre du Texte"
        onSubmit={() => {
          setNameTrip({ ...NameTrip, isVisibleModal: false });
          navigation.navigate("Add", { tripParam: { name: NameTrip.name } });
        }}
      />
      <AddButton onPress={() => setNameTrip({ isVisibleModal: true })} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  alignElement: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    justifyContent: "center"
  }
});

Home.navigationOptions = () => ({
  headerTintColor: "black",
  title: "TripPlanApp",
  headerStyle: {
    backgroundColor: mainColor
  }
});

export default withNavigation(Home);
