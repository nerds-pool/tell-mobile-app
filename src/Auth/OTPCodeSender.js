import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
} from "react-native";
import api from "../../api";

const OTPCodeSender = ({ navigation, route }) => {
  let textInput = useRef(null);

  const lenghtInput = 6;

  const [internalVal, setInternalVal] = useState("");
  const [params, setParams] = useState(route.params);

  const onChangeText = (val) => {
    setInternalVal(val);
  };

  const handleOtpCheck = async () => {
    try {
      const isValid = params.otp === internalVal.toString();
      if (!isValid) {
        alert("Otp is not valid");
        return;
      }

      const body = {
        signupToken: params.token,
      };

      const response = await api.post.postActivate(body);
      if (!response) throw new Error("Account activation failed");
      navigation.replace("Login");
    } catch (error) {
      alert("Activation failed! Please enter a valid OTP code...");
      console.error(error);
    }
  };

  useEffect(() => {
    setParams(route.params);
  }, [route]);

  useEffect(() => {
    textInput.focus();
  }, []);

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
          { fontWeight: "bold", marginTop: 60, fontSize: 17 },
        ]}
      >
        OTP Verification code has been sent to
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold", fontSize: 17 }]}>
        {" "}
        you as a sms
      </Text>

      <Text style={[styles.txtStyle, { fontWeight: "bold", marginTop: 40 }]}>
        Please confirm that the above number is correct
      </Text>
      <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>
        {" "}
        by entering the code sent to you{" "}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          ref={(input) => (textInput = input)}
          onChangeText={onChangeText}
          style={{ width: 5, height: 5 }}
          value={internalVal}
          maxLength={lenghtInput}
          returnKeyType="done"
          keyboardType="number-pad"
        />
        <View style={styles.containerInput}>
          {Array(lenghtInput)
            .fill()
            .map((data, index) => (
              <View
                key={index}
                style={[
                  styles.cellView,
                  {
                    borderBottomColor:
                      index === internalVal.length ? "#000" : "#fff",
                  },
                ]}
              >
                <Text style={styles.cellText} onPress={() => textInput.focus()}>
                  {internalVal && internalVal.length > 0
                    ? internalVal[index]
                    : ""}
                </Text>
              </View>
            ))}
        </View>
      </View>

      <Pressable
        style={[styles.btnStyle, { marginTop: "20%" }]}
        onPress={handleOtpCheck}
      >
        <Text style={[styles.txtStyle, { fontWeight: "bold" }]}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
};

//expo secoure store
export default OTPCodeSender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC7500",
    marginTop: -40,
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
    width: 40,
    height: 40,
    textAlign: "center",
    marginVertical: 50,
    marginHorizontal: 8,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  txtStyle: {
    color: "#fff",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
});
