import Realm from 'realm';
import RNFS from 'react-native-fs';

// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     'Car[]',
    picture:  'data?' // optional property
  }
};
const databaseOptions = {
  //path: 'realmData.realm',
  schema: [CarSchema, PersonSchema]
};

const Tag = {
    name: 'Tag',
    primaryKey: 'id',
    properties: {
      id:  'string',
      displayName: 'string',
      information: 'string',
      props: 'TagProp[]'
    }
};

const TagProp = {
  name: 'TagProp',
  primaryKey: 'prop',
  properties: {
    prop: 'string',
    defaultValue: {type: 'string', default: ''},
    tagId: 'string'
  }
}

const Image = {
  name: 'Image',
  properties: {
    id: 'string',
    prop: 'string',
    value: {type: 'string', default: ''}
  }
}

export var realm = null;

export async function openDB() {
  var exists = await RNFS.exists(RNFS.DocumentDirectoryPath + '/photoTagger6.realm');
  realm = await Realm.open({
      path: RNFS.DocumentDirectoryPath + '/photoTagger6.realm',
      schema: [Tag, TagProp, Image],
  });
  if(!exists) {
    createDB(realm);
  }
  return realm;
}

export function createDB(realm) {
  let scholar = require('./scholartags.json');
  let personal = require('./personaltags.json');
  let globaltags = require('./globaltags.json');

  try {
      //console.warn("Creating DB");
      console.log("db path:" + realm.path);
      realm.write(() => {
        let scholarRealm = realm.create('Tag', {
          id: scholar.about.id,
          displayName: scholar.about.displayName,
          information: scholar.about.information,
          props: []
        }, true);
        for (let i = 0; i < scholar.properties.length; i++) {
          scholarRealm.props.push({
            prop: scholar.properties[i].displayName,
            tagId: scholar.about.id
          });
        }
        let personalRealm = realm.create('Tag', {
          id: personal.about.id,
          displayName: personal.about.displayName,
          information: personal.about.information,
          props: []
        }, true);
        for (let i = 0; i < personal.properties.length; i++) {
          personalRealm.props.push({
            prop: personal.properties[i].displayName,
            tagId: personal.about.id
          });
        }
        let globalRealm = realm.create('Tag', {
          id: globaltags.about.id,
          displayName: globaltags.about.displayName,
          information: globaltags.about.information,
          props: []
        }, true);
        for (let i = 0; i < globaltags.properties.length; i++) {
          globalRealm.props.push({
            prop: globaltags.properties[i].displayName,
            tagId: globaltags.about.id
          });
        }
      });
  } catch (error) {
    console.warn(error)
    console.warn("Error on creation");
  }
}

export const queryTags = () => new Promise((resolve, reject) => {
  try {
    let tags = realm.objects('Tag');
    resolve(tags);
  } catch (error) {
    reject(error);
  };
});

export const queryCars = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allCars = realm.objects('Car');
    resolve(allCars);
  }).catch((error) => {
    reject(error);
  });
});

export const addCars = () => Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      // Create Realm objects and write to local storage
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Honda',
          model: 'Civic',
          miles: 1000,
        });
        myCar.miles += 20; // Update a property value
      });

      // Query Realm for all cars with a high mileage
      //const cars = realm.objects('Car').filtered('miles > 1000');

      // Will return a Results object with our 1 car
      //cars.length // => 1

      // Add another car
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Ford',
          model: 'Focus',
          miles: 2000,
        });
      });
      resolve(true);
      // Query results are updated in realtime
      //cars.length // => 2
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
});
