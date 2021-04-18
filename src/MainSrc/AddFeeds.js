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
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import api from "../../api";
import { getValueFor } from "../../helpers/sec-storage";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const AddFeeds = ({ navigation }) => {
  const [filterData, setFilterData] = useState({
    categories: [],
    authorities: [],
  });
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [authority, setAuthority] = useState("");

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

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get.filterData();
        console.log("Filter Data", response.data.result);
        response &&
          setFilterData((prevState) => ({
            ...prevState,
            categories: response.data.result.categories,
            authorities: response.data.result.authorities,
          }));
      } catch (error) {
        console.log(
          "Error while fetching filter data",
          error.response ?? error.message
        );
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
    if (category === undefined || category === "") {
      alert("Please select a category before proceeding...");
      return;
    }
    if (authority === undefined || authority === "") {
      alert("Please select an authority before proceeding...");
      return;
    }

    if (!title || !content || !city || !district || !landmark || !address) {
      alert("Please fill all fields before proceeding...");
      return;
    }

    try {
      const userId = await getValueFor("userId");
      let media = "";

      if (image !== null) {
        let mediaBody = new FormData();
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
        if (response && !response.data.success) {
          alert("Failed to upload image");
          return;
        }
        media = response.data.result.filename;
        console.log("file name", media);
      }

      const complaintBody = {
        userId,
        title,
        content,
        category,
        location: {
          line: address,
          city: city.toLowerCase(),
          district,
          postal: "",
        },
        category,
        authority,
        landmark,
        media,
      };

      console.log("Complaint", complaintBody);

      const complaintRes = await api.post.postAddComplaint(complaintBody);
      if (complaintRes && !complaintRes.data.success)
        throw new Error("Can't post complaint, Error occured");
      console.log("Post created", complaintRes.data.result);
    } catch (error) {
      console.error(
        "Error",
        error.response.data ?? error.response ?? error.message
      );
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
              style={[styles.txtInput, { textAlignVertical: "top" }]}
              placeholder="Add your story here"
              underlineColorAndroid="transparent"
              numberOfLines={3}
              multiline={true}
              onChangeText={(text) => setContent(text)}
            />
            <TextInput
              value={address}
              style={[
                styles.txtInput,
                { height: 60, textAlignVertical: "top" },
              ]}
              placeholder="Address"
              underlineColorAndroid="transparent"
              numberOfLines={2}
              multiline={true}
              onChangeText={(text) => setAddress(text)}
            />
            <View style={styles.picker}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                <Picker.Item label="Category" value={undefined} />
                {filterData.categories &&
                  filterData.categories.map((category) => (
                    <Picker.Item
                      key={category._id}
                      label={category.title}
                      value={category._id}
                    />
                  ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={authority}
                onValueChange={(itemValue, itemIndex) =>
                  setAuthority(itemValue)
                }
              >
                <Picker.Item label="Authority" value={undefined} />
                {filterData.authorities &&
                  filterData.authorities.map((authority) => (
                    <Picker.Item
                      key={authority._id}
                      label={authority.authorityName}
                      value={authority._id}
                    />
                  ))}
              </Picker>
            </View>
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
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#ccc",
  },
  picker: {
    height: 40,
    marginTop: 20,
    width: WINDOW_WIDTH - 30,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#ccc",
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
