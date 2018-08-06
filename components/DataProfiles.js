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
import { queryTags } from '../databases/schemas';
import Header from './Header';
import RadioButton from './RadioButton';

export default class DataProfiles extends Component {
  state = {
    selected: 'Scholar Tags',
    tags: []
  }
  componentDidMount() {
    queryTags().then(tags => {
      this.setState({
        tags: tags
      });
    })
  }
  render() {
    const tags = [];
    for (let tag of this.state.tags) {
      if (tag.displayName === 'Global Tags') {
        break;
      }
      tags.push(
        <View key={tags.id}>
          <View style={styles.tagRow}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => this.setState({selected: tag.displayName})}
            >
              <RadioButton selected={this.state.selected === tag.displayName}/>
              <Text style={styles.radioButtonText}>{tag.displayName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => this.props.navigation.navigate('ScholarTags', {tag: tag})}
            >
              <Text style={{color: '#FFF'}}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 12, color: '#7A7A7B', paddingHorizontal: 20}}>{tag.information}</Text>
        </View>

      );
    }
    return (
      <View style={styles.container}>
        <Header title='Data Profiles' canGoback navigation={this.props.navigation}/>
        {/* tags section */}
        {tags}
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
  editBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'green',
    marginHorizontal: 20
  },
  radioButtonText: {
    fontSize: 18,
    marginRight:30,
    marginLeft: 10
  },
  radioButton: {
    flexDirection: 'row',
    marginLeft: 20
  }
});
