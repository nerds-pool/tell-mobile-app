import React, { useState } from "react";
import { SafeAreaView, Pressable, TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { save, getValueFor, deleteValueFor } from "../../helpers/sec-storage";

const LoginSrc = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputs = (inputText) => (key) => {
    switch (key) {
      case "email":
        setEmail(inputText);
        break;
      case "pass":
        setPassword(inputText);
        break;
      default:
        break;
    }
  };

  const handleSave = async (value) => {
    try {
      await save("Name", value);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGet = async (key) => {
    try {
      await getValueFor(key);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteValueFor(key);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFetch = async () => {
    try {
      const signinbody = {
        email,
        password,
      };
      const signinResponse = await api.postSignin(signinbody);
      if (!signinResponse) throw new Error("Data not resiv");
      navigation.replace("Feeds");
      alert("Loged");

      console.log("Res:", signinResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.txtStyle, { fontWeight: "bold", fontSize: 46 }]}>
        Tell
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
        Easy and fast way tell us your problem
      </Text>

      <Text
        style={[
          styles.txtStyle,
          {
            fontWeight: "bold",
            fontSize: 32,
            marginTop: 20,
            marginRight: "20%",
          },
        ]}
      >
        Welcome back!
      </Text>
      <Text
        style={[
          styles.txtStyle,
          { fontWeight: "bold", fontSize: 24, marginRight: "45%" },
        ]}
      >
        Login Now
      </Text>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <TextInput
          placeholder="Email"
          style={styles.txtInput}
          value={email}
          onChangeText={(text) => handleInputs(text)("email")}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          style={[styles.txtInput, { marginTop: 25 }]}
          onChangeText={(text) => handleInputs(text)("pass")}
        />

        <Text
          style={[
            styles.txtStyle,
            { fontWeight: "bold", marginLeft: 100, marginTop: 15 },
          ]}
        >
          Forgot Password?
          <Text onPress={() => handleDelete("Name")}>Click here</Text>
        </Text>

        <Pressable
          style={[styles.btnStyle, { marginTop: 90 }]}
          // onLongPress={() => handleGet("Name")}
          onPress={handleFetch}
        >
          <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>Login</Text>
        </Pressable>

        <Text
          style={[
            styles.txtStyle,
            { fontWeight: "bold", fontSize: 15, marginTop: 40 },
          ]}
        >
          Don't Have an Account?
          <Text onPress={() => handleSave("Kavinda Nirushana")}>
            {/*  */}
            Register Now
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginSrc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC7500",
  },
  btnStyle: {
    width: 300,
    height: 40,
    backgroundColor: "#8E0D37",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
  },
  txtInput: {
    backgroundColor: "#fff",
    width: "80%",
    height: 40,
    padding: 10,
  },
  txtStyle: {
    color: "#fff",
    alignContent: "center",
  },
});
