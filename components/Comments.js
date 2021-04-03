import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Avatar, Paragraph } from "react-native-paper";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
 
];

const Item = ({ title }) => (
  <View style={styles.item}>
      <View style={{flexDirection: 'row'}}>
       <Avatar.Image size={40}></Avatar.Image>
       <View style={styles.infoContainer}>
       <Text>Kavinda Nirushana</Text>
       <Text style={{ fontSize: 10, marginTop: -4, color: "gray" }}>
          10:20pm
        </Text>
       </View>
       
       </View>
       <View style={styles.comment}>
       <Paragraph  >Hi this is an post sfgrjgfnht</Paragraph>
       </View>
       
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
 infoContainer: {
    marginLeft: 8,
 },
 comment:{
    
        
        marginLeft: 62,
        width: '75%'
    
 }
});

export default App;