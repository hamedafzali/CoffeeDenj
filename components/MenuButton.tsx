import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';

interface MenuButtonProps {
  label: string;
  onPress: () => void;
  image: string;
  color: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, onPress, image, color }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      aspectRatio: 1,
      margin: 5,
      borderRadius: 5,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelText: {
      fontSize: 20,
      color: 'white',
      position: 'absolute',
      bottom: 10,
      left: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Background overlay to improve text readability
      paddingHorizontal: 0, // Optional: Add some padding for better appearance
      borderRadius: 5 // Optional: Add border radius for rounded corners
    }
    ,    
    emptyImageBackground: {
      backgroundColor: color, // Set the desired color for the background when image is empty
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground 
        source={{ uri: image ? image : null }} 
        style={image ? styles.imageBackground : styles.emptyImageBackground} 
        resizeMode="cover"
      >
          <Text style={styles.labelText}>{label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MenuButton;
