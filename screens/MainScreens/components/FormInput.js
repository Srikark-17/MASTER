import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const textColor = '#fff'
const themeColor = '#F9A826'
export default function FormInput({ labelName, ...rest }) {
    return (
      <TextInput
        label={labelName}
        underlineColor={themeColor}
        style={styles.input}
        selectionColor={'#000'}
        theme={themeColor}
        numberOfLines={1}
        {...rest}
      />
    );
  }
  const styles = StyleSheet.create({
    input: {
      marginTop: 10,
      marginBottom: 10,
      width: width / 1.5,
      height: height / 15,
      color: `${themeColor}`
    }
  });