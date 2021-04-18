import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import api from "../../api";
import { getValueFor } from "../../helpers/sec-storage";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const AddFeeds = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = await getValueFor("userId");
      let mediaBody = new FormData();
      let media = "";
      let fileType = image.uri.split(".").pop();

      mediaBody.append("image", {
        uri: image.uri,
        type: `${image.type}/${fileType}`,
        name: `${image.type}.${fileType}`,
      });

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await api.post.postImage(mediaBody)(config);
      if (!response.data.success) {
        alert("Failed to upload image");
        return;
      }
      media = response.data.result.filename;
      console.log("file name", media);

      const complaintBody = {
        userId,
        title,
        content,
        category,
        location: {
          line: address,
          city,
          district,
          postal: "",
        },
        landmark,
        media,
      };

      console.log("Complainttttttttt", complaintBody);

      const complaintRes = await api.post.postAddComplaint(complaintBody);
      if (!complaintRes.data.success)
        throw new Error("Can't post complaint, Error occured");
      console.log("Post created", complaintRes.data.result);
    } catch (error) {
      console.error("Error", error.response.data);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.addpostcontainer}>
          <View>
            <TextInput
              value={title}
              style={[styles.txtInput, { height: 40 }]}
              placeholder="Title"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              value={content}
              style={styles.txtInput}
              placeholder="Add your story here"
              underlineColorAndroid="transparent"
              numberOfLines={3}
              multiline={true}
              onChangeText={(text) => setContent(text)}
            />
            <TextInput
              value={address}
              style={[styles.txtInput, { height: 60 }]}
              placeholder="Address"
              underlineColorAndroid="transparent"
              numberOfLines={2}
              multiline={true}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              value={category}
              style={[styles.txtInput, { height: 40 }]}
              placeholder="Category"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setCategory(text)}
            />
            <TextInput
              value={landmark}
              style={[styles.txtInput, { height: 40 }]}
              placeholder="Landmark"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setLandmark(text)}
            />
            <TextInput
              value={city}
              style={[styles.txtInput, { height: 40 }]}
              placeholder="City"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setCity(text)}
            />
            <TextInput
              value={district}
              style={[styles.txtInput, { height: 40 }]}
              placeholder="District"
              underlineColorAndroid="transparent"
              onChangeText={(text) => setDistrict(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, marginRight: 150 }}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View style={styles.add}>
          <Icon
            name="camera"
            size={30}
            style={styles.icons}
            onPress={() => navigation.navigate("Take Photo")}
          />
          <Icon
            name="image"
            size={30}
            style={styles.icons}
            onPress={pickImage}
          />
          <Icon
            name="send"
            size={30}
            style={[styles.icons, { marginLeft: "56%" }]}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddFeeds;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  addpostcontainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  txtInput: {
    marginTop: 20,
    width: WINDOW_WIDTH - 30,
    height: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000",
    textAlignVertical: "top",
  },
  add: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 40,
    backgroundColor: "#fff",
    width: "80%",
    height: 40,
    borderRadius: 20,
  },
  icons: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    color: "gray",
  },
});
