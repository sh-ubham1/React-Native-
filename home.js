// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from './api';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image.medium }} style={styles.thumbnail} />
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary}>{item.show.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderMovieItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movieContainer: {
    marginBottom: 20,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  summary: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;
