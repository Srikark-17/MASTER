import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View, TextInput, FlatList, Button, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import { List, Divider } from 'react-native-paper';
import Firebasekeys from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App({navigation}) {
  const [users, setUsers] = useState([]); 
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('THREADS')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discussions</Text>
      <TextInput style={styles.searchBar} placeholder="Search discussions" />
      
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
            <Button color={"#8B8B8B"} title={item.name} numberOfLines = { 3 } style={styles.buttonText} onPress={() => {navigation.navigate('Chat Room', {thread: item })}} />
            <TouchableOpacity styles={styles.trash} onPress={() => navigation.navigate('Chat Room', { thread: item })}>
            </TouchableOpacity>
            <TouchableOpacity><MaterialIcons style={styles.people} name="people" size={20} /></TouchableOpacity>
            <Text style={styles.one}>0</Text>
            <Text style={styles.two}>0</Text>
            <TouchableOpacity><Entypo style={styles.message} name="chat" size={20} /></TouchableOpacity>
            </View>
          )}
        />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Add Discussion')}>
          <View style={styles.addNoteContainer}>
            <AntDesign style={styles.addNote} name="plus" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    top: 75,
    fontFamily: "Avenir",
    marginBottom: 35,
  },
  subtitle: {
    color: "#A8A8A8",
    fontSize: 25,
    top: 45,
  },
  searchBar: {
    height: 45,
    width: 350,
    borderWidth: 1,
    borderRadius: 45,
    borderColor: "#F9A826",
    textAlign: "left",
    color: "#BBBBBB",
    backgroundColor: "#fff",
    fontWeight: "bold",
    top: 100,
    paddingLeft: 15
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  textInput: {
    height: 65,
    width: 313,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
    color: "#BBBBBB",
    backgroundColor: "#ECECEC",
    fontWeight: "bold",
    top: 55,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 80,
    top: 100,
  },
  options1Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: 90,
    marginRight: 10,
  },
  option1Text: {
    left: 100,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options2Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: -100,
    bottom: 110,
  },
  option2Text: {
    left: 85,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options3Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    left: -95,
    bottom: 110,
    marginTop: 10,
  },
  option3Text: {
    left: 60,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options4Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: -100,
    bottom: 220,
  },
  option4Text: {
    left: 65,
    color: "#fff",
    fontSize: 25,
    bottom: 60,
    fontWeight: "bold",
  },
  goBack: {
    top: 2,
    left: 3,
    color: "#fff",
  },
  noteContainer: {
    top: 150,
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    marginBottom: 30,
    width: 300,
    textAlign: "left",
    height: 98
  },
  trash: {
    right: -30,
    bottom: 20,
    position: "absolute",
    color: "#F9A826",
  },
  one: {
    left: 80,
    top: 65,
    position: "absolute",
    color: '#8E8E8E'
  },
  two: {
    left: 225,
    top: 67,
    position: "absolute",
    color: '#8E8E8E'
  },
  people: {
    left: 175,
    bottom: -30,
    position: "absolute",
    color: "#F9A826",
  },
  message: {
    left: 35,
    bottom: -30,
    position: "absolute",
    color: "#F9A826",
  },
  add: {
    left: 280,
    top: -30,
    position: "absolute",
    color: "#F9A826",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 80,
    top: 30,
  },
  addNoteContainer: {
    padding: 10,
    height: 60,
    width: 60, //The Width must be the same as the height
    borderRadius: 100, //Then Make the Border Radius twice the size of width or Height
    backgroundColor: "#F9A826",
  },
  addNote: {
    top: 2,
    left: 3,
    color: "#fff",
  },
});
