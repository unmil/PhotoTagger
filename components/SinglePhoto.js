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

export default class SinglePhoto extends Component {
  state ={
    avatarSource: null,
    projects: []
  }

  componentDidMount() {
    //this.loadProjects();
    //this.showImagePicker();
  }
  render() {
    const properties = {
      Project: 'My favorite project',
      Institution: 'Harry Ransom Center',
      Collection: '',
      Box: ''
    };
    return (
      <View style={styles.container}>
        <Header title='filename' canGoback navigation={this.props.navigation}/>
        {/* photo */}
        <Image
          style={styles.photo}
          source={{uri: 'file://' + RNFS.DocumentDirectoryPath + '/images/A18DBE0A-96D7-47A0-B06A-008150FB27D0.jpg', scale:1}}
        />
        {/* tags section */}
        <FlatList
          data={Object.entries(properties)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
            <View style={styles.card}>
              <Text style={styles.cardKey}>{item[0]}</Text>
              <Text style={styles.cardValue}>{item[1]}</Text>
            </View>}
        />
        {/* camera button */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => this.showImagePicker()}
        >
          <Image
            style={styles.cameraImage}
            source={require('../images/camera-flat.png')}
          />
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
  galleryColumn: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5
  },
  photo: {
    height: 300,
    alignSelf: 'stretch',
    marginBottom: 20
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
  cameraButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#EAEAEB', //grey
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    right: 15
  },
  cameraImage: {
    width: 50,
    height: 50,
  },
});
