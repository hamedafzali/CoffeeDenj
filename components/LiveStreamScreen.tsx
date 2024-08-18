// components/LiveStreamScreen.tsx
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import M3UPlayer from './M3UPlayer'; // Ensure this path is correct

const LiveStreamScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <M3UPlayer playlistUri="https://iptv-org.github.io/iptv/languages/fas.m3u" />
      </View>
    </SafeAreaView>
  );
};

export default LiveStreamScreen;
