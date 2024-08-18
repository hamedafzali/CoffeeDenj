import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import PlayerPage from './PlayerPage';

interface Channel {
  name: string;
  logoUrl: string;
  streamUrl: string;
}

interface M3UPlayerProps {
  playlistUri: string;
}

const M3UPlayer: React.FC<M3UPlayerProps> = ({ playlistUri }) => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const response = await fetch(playlistUri);
        const playlistText = await response.text();
        const channelsData: Channel[] = parsePlaylist(playlistText);
        setChannels(channelsData);
      } catch (error) {
        console.error('Error loading playlist:', error);
      }
    };

    loadPlaylist();
  }, []);

  const parsePlaylist = (playlistText: string): Channel[] => {
    const channelsData: Channel[] = [];
    const lines = playlistText.split('\n');
    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        const info = line.split(',');
        const name = info[1];
        const logoUrl = line.match(/tvg-logo="([^"]*)"/)?.[1]; // Extracting logo URL
        const streamUrl = lines[lines.indexOf(line) + 1]; // Next line contains the stream URL
        if (name && logoUrl && streamUrl) {
          channelsData.push({ name, logoUrl, streamUrl });
        }
      }
    });
    return channelsData;
  };

  const renderChannelsRow = (start: number, end: number) => {
    return channels.slice(start, end).map((channel, index) => (
      <TouchableOpacity key={index} style={styles.channelContainer} onPress={() => handlePlay(channel.streamUrl)}>
        <Image
          source={{ uri: channel.logoUrl }}
          style={styles.channelImage}
          resizeMode="contain"
        />
        <Text>{channel.name}</Text>
      </TouchableOpacity>
    ));
  };
  

  const handlePlay = async (streamUrl: string) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: streamUrl });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing stream:', error);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const imagesPerRow = 3;

  return (
    <ScrollView>
      <View style={styles.container}>
        {Array.from(Array(Math.ceil(channels.length / imagesPerRow)).keys()).map((rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {renderChannelsRow(rowIndex * imagesPerRow, (rowIndex + 1) * imagesPerRow)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  channelContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  channelImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default M3UPlayer;
