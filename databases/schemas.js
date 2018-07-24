import Realm from 'realm';

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
