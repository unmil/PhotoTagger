import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
export default class Header extends Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  render() {
    return(
      <View style={styles.header}>
        {this.props.canGoback ?
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              style={styles.navImage}
              source={require('../images/back-icon.png')}
            />
          </TouchableOpacity> :
          <Text style={styles.navButton}></Text>
        }
        <Text style={styles.title}>{this.props.title}</Text>
        <Menu
          ref={this.setMenuRef}
          button={<TouchableOpacity
                      style={styles.navButton}
                      onPress={this.showMenu}
                    >
                      <Image
                        style={styles.navImage}
                        source={require('../images/hamburger-icon-blk.png')}
                      />
                    </TouchableOpacity>}
        >
          <MenuItem onPress={() => {this.hideMenu; this.props.navigation.navigate('DataProfiles')}}>Data Profiles</MenuItem>
          <MenuItem onPress={this.hideMenu}>Settings</MenuItem>
          <MenuItem onPress={this.hideMenu}>About</MenuItem>
        </Menu>
      </View>
    );
  }

}

const styles = StyleSheet.create({
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
    marginHorizontal: 10
  },
  navImage: {
    width: 20,
    height: 20,
  },
  title: {
    flex: 1,
    color: '#333',
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center'
  }
});
