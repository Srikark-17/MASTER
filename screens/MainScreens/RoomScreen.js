import React, { useContext, useState, useEffect} from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { IconButton } from 'react-native-paper';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const textColor = '#fff'
const themeColor = '#F9A826'

if (!firebase.apps.length) {
    firebase.initializeApp(Firebasekeys);
}
export default function RoomScreen({route, navigation}) {
    // const {user} = useContext(AuthContext)
    // const currentUser = user.toJSON()
    // useEffect(() => {
    //     console.log({ user });
    //   }, []);
    // const thread = this.props.navigation.getParam('message', 'default')
    // const thread = this.props.route.params.thread
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true
    },
    // example of chat message
    {
      _id: 1,
      text: 'Hello, I had a question!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Om Joshi'
      }
    }
  ]);

  
  
function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color={themeColor} />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }
  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1, name: 'User Test' }}
      renderSend={renderSend}
      alwaysShowSend
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });