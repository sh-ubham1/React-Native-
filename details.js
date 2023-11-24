// DetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image.original }} style={styles.thumbnail} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  summary: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default DetailsScreen;
