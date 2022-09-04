/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import SearchBar from './components/SearchBar';

const App = () => {
  const [query, setQuery] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const data = [
    {id: '1', title: 'First item'},
    {id: '2', title: 'Second item'},
    {id: '3', title: 'Third item'},
    {id: '4', title: 'Fourth item'},
  ];

  const handleSearch = text => {
    setQuery(text);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#001315',
        paddingHorizontal: 20,
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchBar query={query} handleSearch={handleSearch} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              style={{
                height: 150,
                width: '100%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              resizeMode="cover"
              source={{uri: 'https://picsum.photos/seed/picsum1/200/300'}}
            />
            <View
              style={{
                padding: 10,
              }}>
              <Text style={styles.listTitle}>Widen my world</Text>
              <Text style={styles.listHeading}>
                Mindsets to Lead Business Transformation
              </Text>
              <Text style={styles.listUserName}>Pierre Robinet</Text>

              <Text style={styles.listUserPosition}>MD, SEA</Text>
              <Text style={styles.listUserCompany}>Ogilvy Consulting </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  labelSearch: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
  listTitle: {
    fontSize: 16,
    color: '#FF8615',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  listHeading: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
  },
  listUserName: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  listUserPosition: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  listUserCompany: {
    fontSize: 14,
    color: '#FF8615',
    fontWeight: '600',
  },
});

export default App;
