import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { Paragraph, TextInput } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api from "../api";
import { getValueFor } from "../helpers/sec-storage";

const CommentsComp = ({ complaintId, comments, onUpdate }) => {
  const [newComment, setNewComment] = useState();
  const [commentData, setCommentData] = useState(comments);

  const handlePostComment = async (complaintId) => {
    try {
      const userId = await getValueFor("userId");
      const body = {
        userId,
        complaintId,
        content: newComment,
      };
      const response = await api.patch.comment(body);
      if (response && !response.data.success)
        throw new Error(response.data.msg);
      setNewComment("");
      onUpdate();
    } catch (error) {
      alert("Error occured while posting the commnet");
      console.error("Error at post comment ", error.response ?? error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {`${item.commentor.firstName} ${item.commentor.lastName}` ?? "Name"}
          </Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Paragraph>{item.content}</Paragraph>
      </View>
    </View>
  );

  useEffect(() => {
    setCommentData([...comments]);
  }, [comments]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          marginBottom: 20,
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Start typing here to post a comment..."
          value={newComment}
          style={{
            width: "80%",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
          onChangeText={(text) => setNewComment(text)}
        />
        <FontAwesome
          name="send"
          size={20}
          style={{ marginTop: 18 }}
          onPress={() => handlePostComment(complaintId)}
        />
      </View>
      <FlatList
        data={commentData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    backgroundColor: "#edede8",
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  infoContainer: {},
  comment: {
    marginLeft: 5,
    width: "75%",
  },
});

export default CommentsComp;
