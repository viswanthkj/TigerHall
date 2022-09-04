/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';

import SearchBar from './components/SearchBar';

const LIST = gql`
  query contentCards($keywords: String) {
    contentCards(filter: {limit: 20, keywords: $keywords, types: [PODCAST]}) {
      edges {
        ... on Podcast {
          name
          preamble
          image {
            ...Image
          }
          categories {
            ...Category
          }
          experts {
            ...Expert
          }
        }
      }
      meta {
        total
        limit
        offset
      }
    }
  }

  fragment Image on Image {
    uri
  }

  fragment Category on Category {
    name
  }

  fragment Expert on Expert {
    firstName
    lastName
    title
    company
  }
`;

const App = () => {
  const [query, setQuery] = useState('');
  const [cardData, setCardData] = useState([]);

  const {data, error, loading, refetch} = useQuery(LIST);
  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching projects', error.message);
    }

    if (data && data.contentCards && data.contentCards.edges) {
      setCardData(data.contentCards.edges);
    }
  }, [error, data]);

  const isDarkMode = useColorScheme() === 'dark';
  const handleSearch = text => {
    setQuery(text);
    refetch({keywords: text});
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
      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#FFF'} size="large" />
        </View>
      )}
      <FlatList
        data={cardData}
        keyExtractor={item => Math.random()}
        contentContainerStyle={styles.container}
        renderItem={({item}) => {
          const {experts, image} = item;
          const {uri} = image;
          const name = `${experts[0].firstName} ${experts[0].lastName}`;
          const title = experts[0].title;
          const company = experts[0].company;
          return (
            <View style={styles.listItem} key={Math.random()}>
              <Image
                style={{
                  height: 150,
                  width: '100%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
                resizeMode="cover"
                source={{
                  uri: 'https://picsum.photos/seed/picsum1/200/300',
                }}
              />
              <View
                style={{
                  padding: 10,
                }}>
                <Text style={styles.listTitle} numberOfLines={1}>
                  {item.name}
                </Text>

                <Text style={styles.listHeading} numberOfLines={1}>
                  {item.preamble && item.preamble.length > 0
                    ? item.preamble
                    : 'No description'}
                </Text>
                <Text style={styles.listUserName} numberOfLines={1}>
                  {name}
                </Text>

                <Text style={styles.listUserPosition} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.listUserCompany} numberOfLines={1}>
                  {company}
                </Text>
              </View>
            </View>
          );
        }}
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
