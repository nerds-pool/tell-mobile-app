import React from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesom from "react-native-vector-icons/FontAwesome";

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView> 
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginLeft: 7, }}>
                    <Avatar.Image source={{uri: 'https://vignette.wikia.nocookie.net/naruto/images/4/42/Naruto_Part_III.png/revision/latest/scale-to-width-down/300?cb=20180117103539'}}
                    size={80} />

                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {marginTop: 15, marginBottom: 5,}]}>Kavinda Nirushana</Title>
                        
                    </View>
                </View>

                <View style={[styles.userInfoSection, {marginTop: '10%', marginLeft: '-10%'}]}>
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 20}}>Homagama, Sri Lanka</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 20}}>+94 76 131 7667</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 20}}>kavinda.n.t@gmail.com</Text>
                    </View>
                </View>
                
                <View style={styles.infoBoxWrapper}>
                    <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 1,}]}>
                        <Title>10</Title>
                        <Caption>Post</Caption>
                    </View>
                
                    <View style={styles.infoBox}>
                        <Title>142</Title>
                        <Caption>UpVotes</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.menuWrapper}> 

            <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <FontAwesom name="cog" color="#8E0D37" size={25}/>
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
                
                <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Icon name="image" color="#8E0D37" size={25}/>
                        <Text style={styles.menuItemText}>My Posts</Text>
                    </View>
                </TouchableRipple>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    infoBoxWrapper: {
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        borderTopColor: '#777777',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 5,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});