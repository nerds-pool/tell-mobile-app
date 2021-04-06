import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import api from '../../api'

const AddFeeds = ({ navigation }) => {

 

  const [image, setImage] = useState(null);
  const [story, setStory] = useState('');

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const handleFetch = async () => {
    try {
      const addFeedbody = {
        story
      };
      const feedResponse = await api.postAddFeed(addFeedbody);
      if (!feedResponse) throw new Error("Data not received");
      console.log("Res:", feedResponse);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('OTP Code');
  };


  return (
    <View style={styles.container}>
      <View style={styles.addpostcontainer}>
        <Avatar.Image
          source={{
            uri:
              "https://vignette.wikia.nocookie.net/naruto/images/4/42/Naruto_Part_III.png/revision/latest/scale-to-width-down/300?cb=20180117103539",
          }}
          size={60}
        />
        <TextInput
          value={story}
          style={styles.txtInput}
          placeholder="Add your story here"
          underlineColorAndroid="transparent"
          numberOfLines={3}
         multiline={true}
         onChangeText={(text) => setStory(text)}
        />
      </View>
      <View style={{marginTop: 20, marginRight: 150}} >
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View style={styles.add}>
        <Icon
          name="camera"
          size={30}
          style={styles.icons}
          onPress={() => navigation.navigate("Take Photo")}
        />
        <Icon name="image" size={30} style={styles.icons} onPress={pickImage} />
        <Icon
          name="send"
          size={30}
          style={[styles.icons, { marginLeft: "56%" }]}
          onPress={handleFetch}
        />
      </View>
    </View>
  );
};

export default AddFeeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    width: "100%",
    
  },
  addpostcontainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  txtInput: {
    marginTop: 20,
    marginLeft: 20,
    width: 260,
    height: 40,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000'
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
