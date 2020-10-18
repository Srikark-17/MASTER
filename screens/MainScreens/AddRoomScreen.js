import React, {useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import FormInput from './components/FormInput';
import {IconButton, Title} from 'react-native-paper'
import FormButton from './components/FormButton'
import firebase from 'firebase'
import Firebasekeys from './../../config'
import 'firebase/firestore';
const textColor = '#fff'
const themeColor = '#F9A826'
const { width, height } = Dimensions.get('screen');

if (!firebase.apps.length) {
    firebase.initializeApp(Firebasekeys);
}
function handleButtonPress(roomName, navigation) {
    if (roomName.length > 0) {
      firebase.firestore()
        .collection('THREADS')
        .add({
          name: roomName
          }
        )
        .then(() => {
          navigation.goBack();
        });
    }
}
export default function AddRoomScreen({ navigation }) {
    const [roomName, setRoomName] = useState('');
    // ... Firestore query will come here later
  
    return (
      <View style={styles.rootContainer}>
          <StatusBar barStyle='dark-content'/>
        <View style={styles.closeButtonContainer}>
          <IconButton
            icon='close-circle'
            size={36}
            color={themeColor}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Create a new chat room</Title>
          <FormInput
            
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            clearButtonMode='while-editing'
          />
          <FormButton
            title='Create'
            modeValue='contained'
            labelStyle={styles.buttonLabel}
            onPress={() => handleButtonPress(roomName, navigation)}
            disabled={roomName.length === 0}
          />
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    buttonLabel: {
      fontSize: 22,
      color: `${textColor}`
    },
  });