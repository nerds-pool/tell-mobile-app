import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {
    Avatar,S
  } from "react-native-paper";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddFeeds = () => {
    return (
        <View style={styles.container}>
             <View style={styles.addpostcontainer}>
           <Avatar.Image source={{
                uri:
                  "https://vignette.wikia.nocookie.net/naruto/images/4/42/Naruto_Part_III.png/revision/latest/scale-to-width-down/300?cb=20180117103539",
              }}
              size={60}
              />
              <TextInput style={styles.txtInput} placeholder="Add your comment here" />
        </View>
        <View>

        </View>
        <View style={styles.add}>
            <Icon name='camera' size={30} style={styles.icons}/>
            <Icon name='image' size={30} style={styles.icons} />
            <Icon name='send' size={30} style={[styles.icons, {marginLeft: '56%'}]} />
        </View>
        </View>
       
    )
}

export default AddFeeds

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#DCDCDC',
        width: '100%',
        height: '100%'
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
        backgroundColor: '#fff'
    },
    add: {
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: 40,
        backgroundColor: '#fff',
        width: '80%',
        height: 40,
        borderRadius: 20,
        
    },
    icons: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20, 
        color: 'gray'
    }
});
