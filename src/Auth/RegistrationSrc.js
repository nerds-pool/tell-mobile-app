import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import api from "../../api";

const RegistrationSrc = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [district, setDistrict] = useState("");
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
      case "AD":
        setAddress(inputText);
        break;
      case "CT":
        setCity(inputText);
        break;
      case "PO":
        setPostal(inputText);
        break;
      case "DT":
        setDistrict(inputText);
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

  const handleSubmit = async () => {
    try {
      const body = {
        firstName,
        lastName,
        address: {
          line: address,
          city: city.toUpperCase(),
          postal: postal.toString(),
          district: district.toUpperCase(),
        },
        contact,
        email: email.toLowerCase(),
        password,
      };
      const response = await api.post.postSignup(body);
      if (!response) throw new Error("Data not received");
      if (!response.data.success) {
        alert("Sign up failed", response.data.msg);
        return;
      }
      navigation.replace("OTP Code", {
        otp: response.data.result.otp,
        token: response.data.result.signupToken,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
        <TextInput
          placeholder="First Name"
          autoFocus
          style={[styles.txtInput]}
          value={firstName}
          onChangeText={(text) => handleInputs(text)("FN")}
        />
        <TextInput
          placeholder="Last Name"
          style={[styles.txtInput, { marginTop: 20 }]}
          value={lastName}
          onChangeText={(text) => handleInputs(text)("LN")}
        />

        <TextInput
          placeholder="Address"
          style={[styles.txtInput, { marginTop: 20 }]}
          value={address}
          onChangeText={(text) => handleInputs(text)("AD")}
        />
        <TextInput
          placeholder="City"
          style={[styles.txtInput, { marginTop: 20 }]}
          value={city}
          onChangeText={(text) => handleInputs(text)("CT")}
        />
        <TextInput
          placeholder="Postal"
          style={[styles.txtInput, { marginTop: 20 }]}
          keyboardType="numeric"
          value={postal}
          onChangeText={(text) => handleInputs(text)("PO")}
        />
        <TextInput
          placeholder="District"
          style={[styles.txtInput, { marginTop: 20 }]}
          value={district}
          onChangeText={(text) => handleInputs(text)("DT")}
        />
        <TextInput
          placeholder="Contact"
          style={[styles.txtInput, { marginTop: 20 }]}
          keyboardType="phone-pad"
          value={contact}
          onChangeText={(text) => handleInputs(text)("CN")}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
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
          onPress={handleSubmit}
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
    </ScrollView>
  );
};

export default RegistrationSrc;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC7500",
    paddingTop: 20,
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
