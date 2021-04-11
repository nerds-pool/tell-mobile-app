import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import PostList from "../../components/PostList";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import Comments from "../../components/Comments";

const Feeds = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tell",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Pressable activeOpacity={0.5}>
            <Avatar rounded backgroundColor="gray" />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 120,
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
            onPress={() => navigation.navigate("My Post")}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </Pressable>
          <Pressable
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Profile Screen")}
          >
            <AntDesign name="user" size={24} color="black" />
          </Pressable>

        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PostList />
      {/* <Comments /> */}
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
