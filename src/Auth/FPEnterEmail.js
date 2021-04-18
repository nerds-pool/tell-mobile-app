import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, Pressable, TextInput } from "react-native";

const FPEnterEmail = ({ navigation }) => {
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
          { fontWeight: "bold", fontSize: 24, marginTop: 60 },
        ]}
      >
        Forgot Your Password?
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold", marginTop: 30 }]}>
        We just need your Registered Mobile Number to
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
        send your password reset
      </Text>
      <TextInput
        placeholder="Email"
        style={[styles.txtInput, { marginTop: 75 }]}
      />

      <Pressable
        style={[styles.btnStyle, { marginTop: "35%" }]}
        onPress={() => navigation.navigate("Change Password")}
      >
        <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
          Reset Password
        </Text>
      </Pressable>

      <Text style={[styles.txtStyle, { fontWeight: "bold", marginTop: 30 }]}>
        When Changing information all terms
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
        and conditions are applied
      </Text>
    </SafeAreaView>
  );
};

export default FPEnterEmail;

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
