import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class RadioButton extends Component {
  render() {
    return(
      <View style={[{
         height: 30,
         width: 30,
         borderRadius: 15,
         borderWidth: 2,
         borderColor: '#4F97D5',
         alignItems: 'center',
         justifyContent: 'center',
       }, this.props.style]}>
         {
           this.props.selected ?
             <View style={{
               height: 12,
               width: 12,
               borderRadius: 6,
               backgroundColor: '#4F97D5',
             }}/> :
             <View style={{
               height: 12,
               width: 12,
               borderRadius: 6,
               borderWidth: 2,
               borderColor: '#4F97D5',
             }}/>
         }
       </View>
    );
  }
}
