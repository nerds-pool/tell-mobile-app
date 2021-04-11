import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyPostList from '../../components/MyPostList'

const MyFeed = () => {
    return (
        <View style={styles.containter}>
            <MyPostList />
            
        </View>
    )
}

export default MyFeed

const styles = StyleSheet.create({
    containter: {
        flex: 1

    }
})
