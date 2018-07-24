import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNFS from 'react-native-fs';
import { YellowBox } from 'react-native'
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { queryCars } from '../databases/schemas';
import Header from './Header';

export default class ScholarTags extends Component {

  componentDidMount() {
    //this.loadProjects();
    //this.showImagePicker();
  }
  render() {
    const properties = [
      ['Project', 'My favorite project'],
      ['Institution', 'Harry Ransom Center'],
      ['Collection', ''],
      ['Box', '']
    ];
    return (
      <View style={styles.container}>
        <Header title='Scholar Tags' canGoback navigation={this.props.navigation}/>
        {/* tags section */}
        <FlatList
          data={properties}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.card}
              onPress={() => this.props.navigation.navigate('EditProperty')}
            >
              <Text style={styles.cardKey}>{item[0]}</Text>
              <Text style={styles.cardValue}>{item[1]}</Text>
            </TouchableOpacity>}
        />
        <TouchableOpacity
          style={[styles.addUserBtn, { backgroundColor: 'green' }]}
          onPress={() => {this.props.navigation.goBack()}}
        >
          <Text style={styles.loginBtnText}> DONE </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 64,
    borderBottomWidth: 0.4,
    borderColor: '#B4B4B4'
  },
  navButton: {
    width: 20,
    height: 20,
    marginRight: 15
  },
  title: {
    flex: 1,
    color: '#333',
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center'
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
  cardKey: {
    fontSize: 16,
    fontWeight:'bold',
  },
  cardValue: {
    fontSize: 14,
    color: '#383838',
    marginLeft: 10
  },
  addUserBtn: {
    paddingVertical: 10,
    paddingHorizontal:50,
    borderRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center'
  },
});
