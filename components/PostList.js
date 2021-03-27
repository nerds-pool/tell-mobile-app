import React from "react";
import { Button } from "react-native";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";

import FontAwesom from "react-native-vector-icons/FontAwesome";
import { Avatar, TouchableRipple } from "react-native-paper";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "Kavinda Nirushana",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    name: "Dylan Wickramasinha",
  },
];

const Item = ({}) => (
  <View style={styles.item}>
    <View style={styles.infoContainter}>
      <Avatar.Image size={40}></Avatar.Image>
      <View style={styles.txtInfoContainter}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Kavinda Nirushana
        </Text>
        <Text style={{ fontSize: 8, marginTop: -4, color: "gray" }}>
          10:20pm
        </Text>
      </View>
      <View style={{ marginLeft: 130, width: 8 }}>
        <TouchableRipple
          onPress={() => {}}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesom name="ellipsis-v" size={16} />
        </TouchableRipple>
      </View>
    </View>
    <View style={styles.postText}>
      <Text>This is the way to complete this project</Text>
    </View>
    <View style={styles.postImage}>
      <Image />
    </View>
    <View style={{ marginTop: 25 }}>
      <Button title="UpVote" />
    </View>
  </View>
);

export default function App() {
  const renderItem = ({ item }) => <Item text={item.name} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#000",
  },
  infoContainter: {
    flexDirection: "row",
  },
  txtInfoContainter: {
    marginLeft: 7,
  },
  postText: {
    marginTop: 15,
  },
});
