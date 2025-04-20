import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useGetMoviesQuery} from '../services/Movies/getMovies';
import {responsive} from '../utils/theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../components/Typography';
import Input from '../components/Input';
import FavoriteCard from '../components/FavoriteCard';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({
  movies,
  scrollX,
  query,
  handleChangeQuery,
  clearInputPress,
}: any) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={item => item?.id?.toString()}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item?.poster}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

const MoviesListScreen = ({navigation}: any) => {
  const [query, setQuery] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading} =
    useGetMoviesQuery();

  const flattenMovies = React.useMemo(() => {
    const movies = data?.pages?.flatMap(page => page || []) ?? [];
    return [{type: 'empty-left'}, ...movies, {type: 'empty-right'}];
  }, [data?.pages]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderItem = React.useCallback(
    ({item, index}: any) => {
      console.log('INDEX', index, flattenMovies?.length);

      if (!item.poster && index !== flattenMovies?.length - 1)
        return <View style={{width: EMPTY_ITEM_SIZE}} />;
      else if (!item.poster && index === flattenMovies?.length - 1)
        return (
          <TouchableOpacity
            onPress={loadMore}
            style={{
              marginVertical: responsive(20),
              paddingHorizontal: responsive(20),
              paddingVertical: responsive(8),
              backgroundColor: 'black',
              borderRadius: responsive(8),
              width: EMPTY_ITEM_SIZE * 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: responsive(12),
            }}>
            <Typography size={14} color="white">
              Load More
            </Typography>
          </TouchableOpacity>
        );

      const inputRange = [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
      ];

      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [100, 50, 100],
        extrapolate: 'clamp',
      });

      return (
        <View>
          <View style={styles.itemContainer}>
            <Animated.View style={[styles.card, {transform: [{translateY}]}]}>
              <Image source={{uri: item.poster}} style={styles.posterImage} />
              <Text style={styles.titleText} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.yearText} numberOfLines={3}>
                {item.year}
              </Text>
            </Animated.View>
          </View>
          <Animated.View
            style={{
              alignSelf: 'center',
              transform: [{translateY}],
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieDetailScreen', {id: item?.id})
              }
              style={{
                marginVertical: responsive(20),
                paddingHorizontal: responsive(20),
                paddingVertical: responsive(8),
                backgroundColor: 'black',
                borderRadius: responsive(8),
              }}>
              <Typography size={14} color="white">
                See Details
              </Typography>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    },
    [scrollX, data?.pages],
  );

  const handleChangeQuery = (text: string) => {
    setQuery(text);
    const lowercasedText = text?.toLowerCase();
    const filtered =
      flattenMovies.length > 0 && text.length > 0
        ? flattenMovies?.filter(item => {
            return item?.title?.toLowerCase().includes(lowercasedText);
          })
        : [];

    setFilteredMovies(filtered);
  };
  const clearInputPress = () => {};

  const renderFilteredItems = ({item, index}: any) => {
    return <FavoriteCard movie={item} hideHeartIcon />;
  };

  return isLoading ? (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  ) : (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search here"
          withIcon
          inputStyle={styles.searchInput}
          value={query}
          clearInput
          onChangeText={handleChangeQuery}
          clearInputPress={clearInputPress}
        />
      </View>
      {filteredMovies?.length === 0 && (
        <Backdrop
          query={query}
          handleChangeQuery={handleChangeQuery}
          clearInputPress={clearInputPress}
          movies={flattenMovies}
          scrollX={scrollX}
        />
      )}
      {filteredMovies?.length > 0 ? (
        <View
          style={{
            marginTop: responsive(100),
            paddingHorizontal: responsive(20),
          }}>
          <FlatList data={filteredMovies} renderItem={renderFilteredItems} />
        </View>
      ) : (
        <Animated.FlatList
          data={flattenMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate={0}
          renderToHardwareTextureAndroid
          contentContainerStyle={styles.flatListContentContainer}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => item?.id?.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    height: BACKDROP_HEIGHT,
    width: width,
    position: 'absolute',
  },
  backdropContentContainer: {
    width: width,
    height: BACKDROP_HEIGHT,
  },
  backdropItem: {
    position: 'absolute',
    height,
    overflow: 'hidden',
  },
  backdropImage: {
    width: width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
  gradient: {
    height: BACKDROP_HEIGHT,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  flatListContentContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    width: ITEM_SIZE,
  },
  card: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    marginBottom: 10,
  },
  titleText: {
    fontSize: responsive(16),
  },
  yearText: {
    fontSize: 12,
  },
  searchContainer: {
    zIndex: 1,
    position: 'absolute',
    top: responsive(30),
    marginVertical: responsive(10),
    paddingBottom: responsive(7),
    width: '80%',
    alignSelf: 'center',
  },
  searchInput: {
    borderRadius: responsive(30),
    height: '80%',
    width: '100%',
  },
});
