// SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from './api';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchMovies = () => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => setSearchResults(response.data))
      .catch(error => console.error(error));
  };

  const renderSearchResultItem = ({ item }) => (
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a movie..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button title="Search" onPress={searchMovies} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderSearchResultItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
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

export default SearchScreen;
