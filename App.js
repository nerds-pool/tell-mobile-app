import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSrc from './src/Auth/LoginSrc';
import LandingSrc from './src/Auth/LandingSrc';
import RegistrationSrc from './src/Auth/RegistrationSrc';
import OTPCodeSender from './src/Auth/OTPCodeSender';
import FPEnterEmail from './src/Auth/FPEnterEmail';
import ChangePassword from './src/Auth/ChangePassword';
import Profile from './src/MainSrc/Profile';
import EditProfile from './src/MainSrc/EditProfile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feeds from './src/MainSrc/Feeds';
import MyFeed from './src/MainSrc/MyFeed';
import AddFeeds from './src/MainSrc/AddFeeds';



const Stack = createStackNavigator();

  function ProfileScreen({navigation}) {
    return(
      <View style={styles.container}>
        <View style={styles.IconEdit}>
          <Icon.Button name="account-edit" size={40} backgroundColor="transparent" color="gray" onPress={() => navigation.navigate('Edit Profile')} /> 
        </View>   
        <Profile />
      </View>
    );
  }

  function EditProfileScreen() {
    return(
      <View style={styles.container}>
        <EditProfile />
      </View>
    );
  }

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing" >
      <Stack.Screen name="Landing" component={LandingSrc} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginSrc} />
      <Stack.Screen name="Registration" component={RegistrationSrc} />
      <Stack.Screen name="OTP Code" component={OTPCodeSender} />
      <Stack.Screen name="Forget Password" component={FPEnterEmail} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Feeds" component={Feeds} />
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      <Stack.Screen name="My Post" component={MyFeed} />
      <Stack.Screen name="Add Feed" component={AddFeeds} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  IconEdit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  
  },
});

