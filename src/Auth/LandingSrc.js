import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";

const LandingSrc = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={[styles.txtStyle, { fontWeight: "bold", fontSize: 46 }]}>
        Tell
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
        Easy and fast way tell us your problem
      </Text>

      <View style={{ marginTop: "110%" }}>
        <Pressable
          style={styles.btnStyle}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.txtStyle, { fontWeight: "bold", fontSize: 16 }]}>
            Login
          </Text>
        </Pressable>

        <Pressable
          style={{
            marginTop: 20,
            width: 300,
            height: 40,
            backgroundColor: "#FFBF24",
            alignItems: "center",
            borderRadius: 20,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Registration")}
        >
          <Text
            style={[
              styles.txtStyle,
              { fontWeight: "bold", color: "#000", fontSize: 16 },
            ]}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LandingSrc;

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
  txtStyle: {
    color: "#fff",
    alignContent: "center",
  },
});
