import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { getValueFor } from "../helpers/sec-storage";
import api from "../api";
import Post from "./Post";

export default function PostList() {
  const [compRender, setCompRender] = useState(0);
  const [report, setReport] = useState({});
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userId = await getValueFor("userId");
        const postUserData = await api.get.getPostList(userId);
        if (!postUserData) {
          throw new Error("Something Went Worng...");
        }
        setPostsData([...postUserData.data.result]);

        const reportData = await api.get.getReport();
        if (!reportData) {
          throw new Error("Something Went Worng...");
        }
        setReport({ ...reportData.data.result });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [compRender]);

  const forceUpdate = () => {
    setCompRender((prevState) => prevState + 1);
  };

  const renderHeader = () => (
    <View
      style={{
        height: 80,
        backgroundColor: "#EC7500",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 20,
        borderRadius: 5,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {report.totalCases ?? 0}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Total</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {report.pendingCases ?? 0}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Pending</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          {report.solvedCases ?? 0}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Solved</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Post data={item} onUpdate={forceUpdate} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={forceUpdate}
        ListHeaderComponent={renderHeader}
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
