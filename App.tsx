import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';
import { Image, View, Text, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAppReady(true);
    };

    loadData();
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('./assets/splash.jpg')} style={styles.splashImage} />
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Please wait...</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loadingText: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
    zIndex: 1, // Ensures text is above other elements
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom of the screen
    alignItems: 'center',
    width: '100%',
  },
  loaderText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
