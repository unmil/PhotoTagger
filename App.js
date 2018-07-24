import { StackNavigator, DrawerNavigator } from 'react-navigation';
import StartGallery from './components/StartGallery';
import SinglePhoto from './components/SinglePhoto';
import DataProfiles from './components/DataProfiles';
import ScholarTags from './components/ScholarTags';
import EditProperty from './components/EditProperty';

const RootStack = StackNavigator(
  {
    MainApp: {
      screen: StartGallery,
    },
    SinglePhoto: {
      screen: SinglePhoto
    },
    DataProfiles: {
      screen: DataProfiles
    },
    ScholarTags: {
      screen: ScholarTags
    },
    EditProperty: {
      screen: EditProperty
    }
  },
  {
    initialRouteName: 'MainApp',
    headerMode: 'none',
  }
);

export default RootStack;
