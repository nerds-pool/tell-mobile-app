import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getValueFor, save } from "./helpers/sec-storage";
import api from "./api";
import LoginSrc from "./src/Auth/LoginSrc";
import LandingSrc from "./src/Auth/LandingSrc";
import RegistrationSrc from "./src/Auth/RegistrationSrc";
import OTPCodeSender from "./src/Auth/OTPCodeSender";
import FPEnterEmail from "./src/Auth/FPEnterEmail";
import ChangePassword from "./src/Auth/ChangePassword";
import Feeds from "./src/MainSrc/Feeds";
import MyFeed from "./src/MainSrc/MyFeed";
import AddFeeds from "./src/MainSrc/AddFeeds";

const Stack = createStackNavigator();

function MainNavigator() {
  const [isUser, setIsUser] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const refToken = await getValueFor("refToken");

        if (!refToken) return setIsUser(false);
        const body = {
          refreshToken: refToken,
        };
        const response = await api.post.postRefresh(body);

        if (!response.data.result) throw new Error("Something went wrong!");

        const newSignToken = response.data.result.signToken;
        const newRefToken = response.data.result.refToken;
        const nomadId = response.data.result.id;

        await save("signToken", newSignToken);
        await save("refToken", newRefToken);
        await save("nomadId", nomadId);

        return setIsUser(true);
      } catch (error) {
        setIsUser(false);
      }
    })();
  });

  return (
    <Stack.Navigator initialRouteName={isUser ? "Feeds" : "Landing"}>
      <Stack.Screen
        name="Landing"
        component={LandingSrc}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginSrc} />
      <Stack.Screen name="Registration" component={RegistrationSrc} />
      <Stack.Screen name="OTP Code" component={OTPCodeSender} />
      <Stack.Screen name="Forget Password" component={FPEnterEmail} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Feeds" component={Feeds} />
      <Stack.Screen name="My Posts" component={MyFeed} />
      <Stack.Screen name="Add Feed" component={AddFeeds} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
