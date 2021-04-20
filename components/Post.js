import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Paragraph } from "react-native-paper";
import { Pressable } from "react-native";
import Comments from "../components/Comments";
import api from "../api";
import { getValueFor } from "../helpers/sec-storage";
import { Dimensions } from "react-native";

const Post = ({ data, onUpdate }) => {
  const refRBSheet = useRef();

  const handleUpVote = async (complaintId) => {
    try {
      const userId = await getValueFor("userId");
      const body = {
        userId,
        complaintId,
      };
      const response = await api.patch.upvote(body);
      if (response && !response.data.success)
        throw new Error("Something went wrong");
      onUpdate();
    } catch (error) {
      console.error("Upvote", error.message);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.postText}>
        <Paragraph style={styles.postTitle}>
          {data.title ?? "Add your story here"}
        </Paragraph>
      </View>
      <View
        style={{
          marginTop: 3,
          marginHorizontal: 12,
        }}
      />
      <View style={styles.infoContainter}>
        <View style={styles.txtInfoContainter}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {`${data.owner.firstName} ${data.owner.lastName} ` ?? "Name"}
          </Text>
          <Text style={{ fontSize: 10, marginTop: 2, color: "gray" }}>
            {`Updated At: ${new Date(data.createdAt).getFullYear()}/${
              new Date(data.createdAt).getMonth() + 1
            }/${new Date(data.createdAt).getDate()}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 10,
          marginHorizontal: 12,
        }}
      />

      <View style={styles.postText}>
        <Paragraph>{data.content ?? "Add your story here"}</Paragraph>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 10,
          marginHorizontal: 12,
        }}
      />
      <View style={styles.postText}>
        <Paragraph>
          {`Landmark: ${data.landmark}` ?? "Add your story here"}
        </Paragraph>
        <Paragraph>
          {`Address: ${data.location.line}` ?? "Add your story here"}
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
          marginTop: 10,
          marginHorizontal: 12,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-between",
          maxWidth: Dimensions.get("window").width - 60
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 12, fontSize: 14 }}
          >
            {`${data.status.toUpperCase()}`}
          </Text>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${data.category.title}`}
          </Text>
          {/* <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${data.authority.authorityName}`}
          </Text> */}
        </View>
        <View>
          <Text
            style={{ fontWeight: "bold", marginHorizontal: 5, fontSize: 14 }}
          >
            {`${data.votes.length} Votes`}
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btnStyle}
          onPress={() => handleUpVote(data._id)}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check-circle" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 5 }}>
              UpVote
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.btnStyle, { marginLeft: 2 }]}
          onPress={() => refRBSheet.current.open()}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="comment" size={20} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 5 }}>
              Comment
            </Text>
          </View>
        </Pressable>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#ccc",
          },
          container: {
            height: "80%",
            elevation: 10,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            paddingHorizontal: 10,
          },
        }}
      >
        <Comments
          complaintId={data._id}
          comments={data.comments}
          onUpdate={onUpdate}
        />
      </RBSheet>
    </View>
  );
};

export default Post;

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
    marginTop: 10,
  },
  postTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  postText: {
    marginTop: 15,
    width: "85%",
    marginHorizontal: 12,
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
    flex: 1,
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
