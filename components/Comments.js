import React, {useState, useEffect} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { Avatar, Paragraph } from "react-native-paper";
import api from "../api";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },

];


const App = () => {

  
  const[userComments ,setUserComments] = useState([]);

  const renderItem = ({ item }) =>  (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <Avatar.Image size={40}></Avatar.Image>
        <View style={styles.infoContainer}>
          <Text>{item.firstName ?? "Name"}</Text>
          <Text style={{ fontSize: 10, marginTop: -4, color: "gray" }}>
          {`Updated At: ${new Date(item.updatedAt).getFullYear()}/${
                new Date(item.updatedAt).getMonth() + 1
              }/${new Date(item.updatedAt).getDate()}`}
          </Text>
        </View>
      </View>
      <View style={styles.comment}>
        <Paragraph>{item.comment}</Paragraph>
      </View>
    </View>
  );

  useEffect(() => {
    async function fetchComments() {
      try {
        const comments = await api.get.getComments();
        if (!comments) {
          throw new Error("Something Went Worng");
        }
        setUserComments([...comments.data.result]);
        console.log("Res: ", comments.data);
        return comments;
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  }, []);

  
  return (
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    
  },
  item: {
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  infoContainer: {
    marginLeft: 8,
  },
  comment: {
    marginLeft: 62,
    width: "75%",
  },
});

export default App;
