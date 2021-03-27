import React from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, Pressable, View } from 'react-native'

const OTPCodeSender = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.txtStyle, {fontWeight: 'bold', fontSize: 46}]}>Tell</Text>
            <Text style={[styles.txtStyle, {fontWeight: 'bold'}]}>Easy and fast way tell us your problem</Text>

            <Text style={[styles.txtStyle, {fontWeight: 'bold', marginTop: 60, fontSize: 17}]}>OTP Verification code has been sent to</Text>
            <Text style={[styles.txtStyle, {fontWeight: 'bold', fontSize: 17}]}> you as a sms</Text>

            <Text style={[styles.txtStyle, {fontWeight: 'bold', marginTop: 40,}]}>Please confirm that the above number is correct</Text>
            <Text style={[styles.txtStyle, {fontWeight: 'bold'}]}> by entering the code sent to you </Text>

            <View style={styles.inputContainer} >
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
                <TextInput style={styles.txtInput} maxLength={1} keyboardType='number-pad'/>
            </View>

            < Pressable style={[styles.btnStyle,{ marginTop: '20%' }]} onPress={()=> navigation.navigate("Profile Screen")} >
                <Text style={[styles.txtStyle, {fontWeight: 'bold'}]}>Next</Text>
            </ Pressable>
    
        </SafeAreaView>
    )
}

//expo secoure store
export default OTPCodeSender

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EC7500',
        marginTop: -40
    },
    btnStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#8E0D37',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    txtInput: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        paddingLeft: 15,
        marginVertical: 50,
        marginHorizontal: 8,

    },
    inputContainer:{
        flexDirection: 'row',
    },
    txtStyle: {
        color: '#fff',
    },
})

