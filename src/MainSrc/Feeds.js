import React, { useLayoutEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import PostList from "../../components/PostList";
import { AntDesign } from "@expo/vector-icons";

const Feeds = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "tell",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "#EC7500", fontSize: 30, fontWeight: "bold" },
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 20,
          }}
        >
          <Pressable
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Add Feed")}
          >
            <AntDesign name="form" size={24} color="black" />
          </Pressable>

          <Pressable
            activeOpacity={0.5}
            onPress={() => navigation.navigate("My Posts")}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PostList />
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
