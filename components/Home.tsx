import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, useColorScheme, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Menu from './Menu';
import M3UPlayer from './M3UPlayer';
import { jsonData } from './ImageHandler';

interface MenuItem {
  label: string;
  page: string;
  color: string;
  image: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const colorScheme = useColorScheme(); // Detect the system color scheme
  const menuContent: MenuItem[] = jsonData.menuContent;

  const onMenuItemPress = (page: string) => {
    if (page === 'LiveStream') {
      setSelectedPage('LiveStream'); // Set state to show the M3UPlayer
    } else {
      // Handle other pages or reset state
      setSelectedPage(null);
    }
  };

  const goBack = () => {
    setSelectedPage(null); // Reset state to show the menu
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  // Determine styles based on theme
  const styles = createStyles(colorScheme);

  return (
    <SafeAreaView style={styles.safeArea}>
      {selectedPage === 'LiveStream' ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </TouchableOpacity>
          <View style={styles.playerContainer}>
            <M3UPlayer playlistUri="https://iptv-org.github.io/iptv/languages/fas.m3u" />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Menu menuItems={menuContent} onMenuItemPress={onMenuItemPress} changeLanguage={() => console.log("clicked")} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Define styles based on theme
const createStyles = (colorScheme: 'dark' | 'light') => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff', // Background color based on theme
  },
  container: {
    flex: 1,
  },
  backButton: {
    padding: 10,
    backgroundColor: colorScheme === 'dark' ? '#333333' : '#e0e0e0',
    alignItems: 'center',
  },
  backButtonText: {
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  playerContainer: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
  },
});

export default HomeScreen;
