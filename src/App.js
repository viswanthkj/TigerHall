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
  Keyboard,
} from 'react-native';
import {useQuery} from '@apollo/client';
import LIST from './query/contentCardsQuery';

import SearchBar from './components/SearchBar';

const App = () => {
  const [query, setQuery] = useState('');
  const [cardData, setCardData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const {data, error, loading, refetch, fetchMore} = useQuery(LIST, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });

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
    setLoadingSearch(true);
    setTimeout(() => {
      refetch({keywords: text});
      setLoadingSearch(false);
    }, 300);
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        limit: data.contentCards.edges.length + 10,
        offset: data.contentCards.edges.length,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult || !fetchMoreResult.contentCards) {
          return previousResult;
        }

        return {
          contentCards: {
            ...previousResult.contentCards,
            ...fetchMoreResult.contentCards,
          },
        };
      },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchBar query={query} handleSearch={handleSearch} disabled={loading} />
      {((loading || loadingSearch) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'#FFF'} size="large" />
        </View>
      )) || (
        <FlatList
          data={cardData}
          onScroll={Keyboard.dismiss}
          keyExtractor={item => Math.random()}
          contentContainerStyle={styles.container}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.loadingContainer}>
              <Text style={styles.labelSearch}>No content available</Text>
            </View>
          }
          renderItem={({item}) => {
            const {experts, image} = item;
            const {uri} = image;
            const name = `${experts[0].firstName} ${experts[0].lastName}`;
            const title = experts[0].title;
            const company = experts[0].company;
            return (
              <View style={styles.listItem} key={Math.random()}>
                <Image
                  style={styles.imgContainer}
                  resizeMode="cover"
                  source={{
                    uri: uri,
                  }}
                />
                <View style={styles.listContentContainer}>
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
                    {title || 'MD,SEA'}
                  </Text>
                  <Text style={styles.listUserCompany} numberOfLines={1}>
                    {company || 'Ogilvy Consulting'}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#001315',
    paddingHorizontal: 20,
  },
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  labelSearch: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
  imgContainer: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
  },
  listContentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
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
