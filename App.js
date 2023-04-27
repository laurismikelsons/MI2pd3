import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Alert,  } from 'react-native';
import {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import React from 'react';




export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const url = "https://api.openweathermap.org/data/2.5";


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
      location && handleWeatherUpdate()
    },
    [location]);

  const handleWeatherUpdate = async () => {
  await fetch(`${url}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=35fc4f6bc1cedc3219e3303b71ceb060`)
    .then((resp) => resp.json())
    .then((json) => setData(json));
}
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {

  }
  return (
    <View style={styles.container}>
      {console.log(data)}
      {data !== null &&
        <>
        <Text>Place: {data.name}</Text>
        <Text>Latitude: {data.coord.lat}</Text>
        <Text>Longitude: {data.coord.lon}</Text>
        <Text>Temperature: {data.main.temp}</Text>
        <Text>Pressure: {data.main.pressure}</Text>
        <Text>Humidity: {data.main.humidity}</Text>
        <MapView style={styles.map} showsUserLocation={true} />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    borderWidth: 10,
    borderColor: 'blue',
    position: 'absolute',
    alignItems: 'center',
    ustifyContent: 'center',
    width: 100,
    bottom: 80,
    right: 50,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
});

/*
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const url = "https://api.openweathermap.org/data/2.5";

  useEffect(() => {
    const fetchData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);


      console.error(`${url}/weather?lat=${lat}&lon=${long}&units=metric&appid=4774a4c696c95e4b6bd7b3d7ec5c6f73`)


      await fetch(`${url}/weather?lat=${lat}&lon=${long}&units=metric&appid=4774a4c696c95e4b6bd7b3d7ec5c6f73`)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      console.log(data);


      
    }
    fetchData();
  }, [data]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(long);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>

      <MapView style={styles.map} showsUserLocation={true}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
/*
function DetailsScreen(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=57.1050233&lon=24.8565416&units=metric&appid=4774a4c696c95e4b6bd7b3d7ec5c6f73"

  //const getMovies = async () => {
  //  try {
  //    const response = await fetch('https://reactnative.dev/movies.json');
  //    const json = await response.json();
  //    setData(json.movies);
  //  } catch (error) {
  //    console.error(error);
  //  } finally {
  //    setLoading(false);
 //   }
 // };

  useEffect(() => {
    fetch(url)
    .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    //getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.temp}, {item.punchline}
            </Text>
          )}
        />
      )}
    </View>
  );
  */

