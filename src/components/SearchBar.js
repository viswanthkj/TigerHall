/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const SearchBar = ({query, handleSearch}) => {
  return (
    <View>
      <Text style={styles.labelSearch}>Search</Text>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Type any keyword"
        placeholderTextColor="#989898"
        style={{
          backgroundColor: '#003238',
          marginTop: 5,
          color: '#FFF',
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  labelSearch: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
