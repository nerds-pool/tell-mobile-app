import React, { useRef, useEffect } from "react";
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
import { Avatar, Paragraph } from "react-native-paper";

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"; // 0.8.0
import { getValueFor } from "../helpers/sec-storage"
import api from "../api";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "Kavinda Nirushana",
  },
];


export default function PostList() {
  const[postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userId = await getValueFor("userId");
        const postUserData = await api.get.getUserPostList(userId);
        if (!postUserData) {
          throw new Error("Something Went Worng");
        }
        setPostList([...postUserData.data.result])
        
        return postUserData
      } catch (error) {
        console.log(error.message)
      }
    })();
  }, []);

  const renderItem = ({item}) =>(
    <View style={styles.item}>
      <View style={styles.infoContainter}>
        <Avatar.Image size={40}></Avatar.Image>
        <View style={styles.txtInfoContainter}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.first ?? 'Name'}
          </Text>
          <Text style={{ fontSize: 10, marginTop: -4, color: "gray" }}>
          {`Updated At: ${new Date(item.updatedAt).getFullYear()}/${
              new Date(item.updatedAt).getMonth() + 1
            }/${new Date(item.updatedAt).getDate()}`}
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
          {item.content ?? "User Story"}
        </Paragraph>
      </View>
      <View style={styles.postImage}>
        <Image
          style={{ width: "100%", height: 250 }}
          source={ item.media ?? require("../Images/banner-small-garbage-day_402x-1.jpg")}
        />
        
      </View>
      <View style={{padding: 10}}></View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item, index) => index.toString()}
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
