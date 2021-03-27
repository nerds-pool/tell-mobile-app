import React, { useState } from "react";
import { SafeAreaView, Pressable } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";

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
          style={[styles.txtInput, { marginTop: 25 }]}
          onChangeText={(text) => handleInputs(text)("pass")}
        />

        <Text
          style={[
            styles.txtStyle,
            { fontWeight: "bold", marginLeft: 100, marginTop: 15 },
          ]}
        >
          Forgot Password?{" "}
          <Text onPress={() => navigation.navigate("Forget Password")}>
            {" "}
            Click here
          </Text>
        </Text>

        <Pressable
          style={[styles.btnStyle, { marginTop: 90 }]}
          onPress={() => navigation.navigate("Feeds")}
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
          <Text onPress={() => navigation.navigate("Registration")}>
            {" "}
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
