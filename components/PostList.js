import React, { useRef, useEffect, useState } from "react";
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
import Comments from "../components/Comments";
import { ScrollView } from "react-native-gesture-handler";
import {getValueFor } from "../helpers/sec-storage"

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "Kavinda Nirushana",
  },
];


export default function PostList() {
  
  const[comment, setComment] = useState('');
  const refRBSheet = useRef();
  const[postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userId = await getValueFor("userId");
        const postUserData = await api.get.getPostList(userId);
        if (!postUserData) {
          throw new Error("Something Went Worng");
        }
        setPostList([...postUserData.data.result])
       
        postUserData
      } catch (error) {
        console.log(error.message)
      }
    })();
  }, []);

  const handleComment = async () => {
    try {
      const body = {
        comment
      };
      const response = await api.post.postComment(body);
      if (!response) throw new Error("Data not received");
      if(!response.data.success) {
        alert("Sign up failed", response.data.msg);
        return;
      }
      console.log("Res:", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.infoContainter}>
        <Avatar.Image size={40}></Avatar.Image>
        <View style={styles.txtInfoContainter}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.firstName ?? "Name"}
          </Text>
          <Text style={{ fontSize: 10, marginTop: -4, color: "gray" }}>
          {`Updated At: ${new Date(item.updatedAt).getFullYear()}/${
              new Date(item.updatedAt).getMonth() + 1
            }/${new Date(item.updatedAt).getDate()}`}
          </Text>
        </View>

        
      </View>
      <View style={styles.postText}>
        <Paragraph>
        {item.content ?? "Add your story here"}
        </Paragraph>
      </View>
      <View style={styles.postImage}>
        <Image
          style={{ width: "100%", height: 250 }}
          source={item.media ?? require("../Images/banner-small-garbage-day_402x-1.jpg")}
        />
        
      </View>
      <Text
        style={{ fontWeight: "bold", marginVertical: 3, fontSize: 12 }}
      >
        204 Upvotes
      </Text>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btnStyle}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesom name="check-circle" size={22} color="#fff" />
            <Text
              style={{ color: "#fff", fontWeight: "bold", marginLeft: 5 }}
            >
              UpVote
            </Text>
          </View>
        </Pressable>
        <Pressable style={[styles.btnStyle, { marginLeft: 2 }]} onPress={() => refRBSheet.current.open()}  >
          <View style={{ flexDirection: "row" }}>
            <FontAwesom name="comment" size={20} color="#fff" />
            <Text
              style={{ color: "#fff", fontWeight: "bold", marginLeft: 5 }}
            >
              Comment
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item, index) => index.toString()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            height: "80%",
          },
        }}
      >
        <ScrollView>
          <Comments />
        </ScrollView>
        <View
          style={{
            height: 50,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Add your comment"
            value={comment}
            style={{
              paddingLeft: 10,
              width: "80%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onChangeText={(text)=> setComment(text)}
          />
          <FontAwesom name="send" size={20} style={{ marginTop: 18 }} onPress={handleComment} />
        </View>
      </RBSheet>
      
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
