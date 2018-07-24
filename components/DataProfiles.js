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
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { YellowBox } from 'react-native'
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { queryCars } from '../databases/schemas';
import Header from './Header';
import RadioButton from './RadioButton';

export default class DataProfiles extends Component {

  componentDidMount() {
    //this.loadProjects();
    //this.showImagePicker();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title='Data Profiles' canGoback navigation={this.props.navigation}/>
        {/* tags section */}
        <View style={styles.tagRow}>
          <TouchableOpacity
            style={{marginHorizontal: 20}}
            onPress={() => this.props.navigation.navigate('ScholarTags')}
          >
            <Image
              style={styles.infoIcon}
              source={require('../images/blue-info-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton}>
            <Text style={styles.radioButtonText}>Scholar Tags</Text>
            <RadioButton selected/>
          </TouchableOpacity>
        </View>

        <View style={styles.tagRow}>
          <TouchableOpacity style={{marginHorizontal: 20}}>
            <Image
              style={styles.infoIcon}
              source={require('../images/blue-info-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton}>
            <Text style={styles.radioButtonText}>Personal Tags</Text>
            <RadioButton />
          </TouchableOpacity>
        </View>
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
  tagRow: {
    flexDirection: 'row',
    marginTop: 30
  },
  infoIcon: {
    height: 30,
    width:30,
  },
  radioButtonText: {
    fontSize: 18,
    marginRight:30
  },
  radioButton: {
    flexDirection: 'row'
  }
});
