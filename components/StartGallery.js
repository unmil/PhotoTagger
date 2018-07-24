/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
export default class StartGallery extends Component {
  state ={
    avatarSource: null,
    projects: []
  }

  loadProjects() {
    queryCars().then((projects) => {
      for (let p of projects) {
        console.log(`  ${p.make}`);
      }
      this.setState({
        projects: projects
      });
    });
  }
  showImagePicker() {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Select Photo Source',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  componentDidMount() {
    //this.loadProjects();
    //this.showImagePicker();
  }
  render() {
    var images = ['1155F9B1-1ADF-41AD-A31C-2611B5BC782A.jpg'];
    for (var i = 0; i < 30; i++) {
      images.push('A18DBE0A-96D7-47A0-B06A-008150FB27D0.jpg');
    }
    return (
      <View style={styles.container}>
        <Header title='PhotoTagger' navigation={this.props.navigation}/>
        {/* search bar */}
        <View style={styles.searchBarBackground}>
          <View style={styles.searchBar}>
            <Image
              style={styles.searchBarImage}
              source={require('../images/search-icon.png')}
            />
            <TextInput
              style={styles.searchBarInput}
              placeholder="Search"
              onChangeText={(text) => this.handleSearchChange(text)}
            />
          </View>
        </View>
        {/* gallery section */}
        <FlatList
          numColumns={3}
          columnWrapperStyle={styles.galleryColumn}
          data={images}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SinglePhoto')}
            >
              <Image
                style={styles.photoItem}
                source={{uri: 'file://' + RNFS.DocumentDirectoryPath + '/images/' + item, scale:1}}
              />
            </TouchableOpacity>}
          keyExtractor={(item, index) => index}
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
  searchBarBackground: {
    backgroundColor: '#F2F2F2',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#FFF',
    margin: 7,
    padding: 5,
    borderRadius: 10
  },
  searchBarInput: {
    flex: 1
  },
  searchBarImage: {
    padding: 3,
    margin: 5,
    height: 18,
    width: 18,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  galleryColumn: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5
  },
  photoItem: {
    height: 100,
    width:100
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
