import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Paragraph } from "react-native-paper";
import { getValueFor } from "../helpers/sec-storage";
import api from "../api";

export default function PostList() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userId = await getValueFor("userId");
        const postUserData = await api.get.getUserPostList(userId);
        if (!postUserData) {
          throw new Error("Something Went Worng");
        }
        setPostsData([...postUserData.data.result]);
      } catch (error) {
        alert(
          "Something went wrong while loading your complaints. Please check your internet connection..."
        );
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [rerender]);

  const forceUpdate = () => {
    setRerender((prevState) => prevState + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.postText}>
        <Paragraph style={styles.postTitle}>
          {item.title ?? "Add your story here"}
        </Paragraph>
      </View>
      <View style={styles.infoContainter}>
        <View style={styles.txtInfoContainter}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {`${item.owner.firstName} ${item.owner.lastName} ` ?? "Name"}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 2, color: "gray" }}>
            {`Updated At: ${new Date(item.createdAt).getFullYear()}/${
              new Date(item.createdAt).getMonth() + 1
            }/${new Date(item.createdAt).getDate()}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 5,
        }}
      />
      

      <View style={styles.postText}>
        <Paragraph>{item.content ?? "Add your story here"}</Paragraph>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 5,
        }}
      />
      <View style={styles.postText}>
        <Paragraph>
          {`Landmark: ${item.landmark}` ?? "Add your story here"}
        </Paragraph>
        <Paragraph>
          {`Address: ${item.location.line}` ?? "Add your story here"}
        </Paragraph>
      </View>
      {/* <View style={styles.postImage}>
        <Image
          style={{ width: "100%", height: 250 }}
          source={require("../Images/banner-small-garbage-day_402x-1.jpg")}
        />
      </View> */}
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 5,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${item.status.toUpperCase()}`}
          </Text>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${item.category.title}`}
          </Text>
          {/* <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${item.authority.authorityName}`}
          </Text> */}
        </View>
        <View>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${item.votes.length} Votes`}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={forceUpdate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 32,
    color: "#000",
  },
  infoContainter: {
    flexDirection: "row",
  },
  txtInfoContainter: {
    marginLeft: 12,
    marginTop: 20,
  },
  postTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
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
