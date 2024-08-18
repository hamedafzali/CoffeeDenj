// components/Menu.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MenuButton from './MenuButton';
interface MenuItem {
  label: string;
  page: string;
  color: string;
  image: string; 
}
interface MenuProps {
  menuItems: MenuItem[];
  onMenuItemPress: (page: string) => void;
  changeLanguage: (language: string) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, onMenuItemPress, changeLanguage }) => {
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  const menuStyles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    languageButton: {
      padding: 10,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      marginBottom: 10,
    },
  });
  const renderMenuButtons = () => {
    const menuChunks = chunkArray(menuItems, 2);
  
    return menuChunks.map((row, rowIndex) => (
      <View key={rowIndex} style={menuStyles.rowContainer}>
        {row.map((menuItem, index) => {
          return (
            <MenuButton
              key={index}
              label={menuItem.label}
              onPress={() => onMenuItemPress(menuItem.page)}
              image={menuItem.image}
              color={menuItem.color}
            />
          );
        })}
      </View>
    ));
  };
  
  return (
    <View>
      {renderMenuButtons()}
    </View>
  );
};

export default Menu;
