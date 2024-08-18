// LanguageSwitcher.tsx
import React, { useRef } from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  changeLanguage: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ changeLanguage }) => {
  const { i18n: translationI18n } = useTranslation();
  const currentLanguage = translationI18n.language;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Trigger a scale animation when the button is pressed
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: false }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: false }),
    ]).start();
  
    // Change the language based on the current language
    let newLanguage = 'en';
  
    if (currentLanguage === 'en') {
      newLanguage = 'fa';
    } else if (currentLanguage === 'fa') {
      newLanguage = 'de';
    }
  
    changeLanguage(newLanguage);
  };
  

  const getButtonText = () => {
    switch (currentLanguage) {
      case 'en':
        return 'English';
      case 'fa':
        return 'فارسی';
      case 'de':
        return 'Deutsch';
      default:
        return '';
    }
  };

  return (
    <Animated.View style={[styles.languageSwitchButton, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.languageSwitchButtonText}>{getButtonText()}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  languageSwitchButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    //left: 10,
    width: 100,
    backgroundColor: '#4CAF50', // Green color (change as needed)
    borderRadius: 15,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  languageSwitchButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
