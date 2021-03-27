import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import api from "../../api";

const RegistrationSrc = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputs = (inputText) => (key) => {
    switch (key) {
      case "FN":
        setFirstName(inputText);
        break;
      case "LN":
        setLastName(inputText);
        break;
      case "CN":
        setContact(inputText);
        break;
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

  const handleFetch = async () => {
    try {
      const body = {
        firstName,
        lastName,
        email,
        contact,
        password,
      };
      const response = await api.postSignup(body);
      if (!response) throw new Error("Data not resiv");
      navigation.replace("OTP Code");
      alert("hair");

      console.log("Res:", response);
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
            marginRight: "40%",
          },
        ]}
      >
        Register
      </Text>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "12%",
        }}
      >
        <View style={[styles.input]}>
          <TextInput
            placeholder="First Name"
            autoFocus
            style={[styles.txtInput, { width: 160 }]}
            value={firstName}
            onChangeText={(text) => handleInputs(text)("FN")}
          />
          <TextInput
            placeholder="Last Name"
            autoFocus
            style={[styles.txtInput, { width: 160, marginLeft: 10 }]}
            value={lastName}
            onChangeText={(text) => handleInputs(text)("LN")}
          />
        </View>

        <TextInput
          placeholder="Contact"
          style={[styles.txtInput, { marginTop: 20 }]}
          keyboardType="name-phone-pad"
          value={contact}
          onChangeText={(text) => handleInputs(text)("CN")}
        />
        <TextInput
          placeholder="Email"
          style={[styles.txtInput, { marginTop: 20 }]}
          value={email}
          onChangeText={(text) => handleInputs(text)("email")}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={[styles.txtInput, { marginTop: 20 }]}
          value={password}
          onChangeText={(text) => handleInputs(text)("pass")}
        />

        <Text style={[styles.txtStyle, { marginTop: 60, fontWeight: "bold" }]}>
          By Registering, you agree with our
        </Text>
        <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
          Terms of Conditions and Privacy Policy
        </Text>

        <Pressable
          style={[styles.btnStyle, { marginTop: 50 }]}
          onPress={handleFetch}
        >
          <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
            Register
          </Text>
        </Pressable>

        <Text style={[styles.txtStyle, { fontWeight: "bold", marginTop: 40 }]}>
          Already have an account?
          <Text onPress={() => navigation.navigate("Login")}> Login</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSrc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC7500",
    marginTop: -20,
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
  input: {
    flexDirection: "row",
  },
});
