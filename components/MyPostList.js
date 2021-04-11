import React, { useRef, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
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
import { Avatar, Paragraph, TextInput } from "react-native-paper";
import { Pressable } from "react-native";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"; // 0.8.0
import Comments from "./Comments";
import { ScrollView } from "react-native-gesture-handler";
import {getValueFor } from "../helpers/sec-storage"
import api from "../api";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "Kavinda Nirushana",
  },
];


export default function PostList() {

  useEffect(() => {
    (async () => {
      try {
        const userId = await getValueFor("userId");
        const postUserData = await api.get.getPostList(userId);
        if (!postUserData) {
          throw new Error("Something Went Worng");
        }
        console.log("UserId", userId);
        console.log("Posted Data: ", postUserData.data);
        
      } catch (error) {
        console.log(error.message)
      }
    })();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.infoContainter}>
              <Avatar.Image size={40}></Avatar.Image>
              <View style={styles.txtInfoContainter}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Kavinda Nirushana
                </Text>
                <Text style={{ fontSize: 10, marginTop: -4, color: "gray" }}>
                  10:20pm
                </Text>
              </View>

              <MenuProvider style={styles.incontainer}>
                <View style={{ marginTop: 20 }}>
                  <Menu>
                    <MenuTrigger>
                      <FontAwesom
                        name="ellipsis-v"
                        size={16}
                        style={{ justifyContent: "center", width: 20 }}
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        onSelect={() => alert(`Delete`)}
                        text="Delete"
                      />
                    </MenuOptions>
                  </Menu>
                </View>
              </MenuProvider>
            </View>
            <View style={styles.postText}>
              <Paragraph>
                Hi this is an post
                sfgrjgfnhtgbirfgnthnotahujaik'hyrjhnikrtgouhy'htjhnrarytijut
              </Paragraph>
            </View>
            <View style={styles.postImage}>
              <Image
                style={{ width: "100%", height: 250 }}
                source={require("../Images/banner-small-garbage-day_402x-1.jpg")}
              />
              
            </View>
            <View style={{padding: 10}}></View>
          </View>
        )}
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
    padding: 10,
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
    marginLeft: 12,
    width: "85%",
  },
  postImage: {
    marginTop: 15,
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 179,
    height: 40,
    backgroundColor: "#8E0D37",
  },
  incontainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginLeft: 140,
  },
});
