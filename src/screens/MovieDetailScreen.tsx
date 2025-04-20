import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetMovieIdQuery} from '../services/Movies/getMovieById';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainLayout from '../components/MainLayout';
import {
  responsive,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../utils/theme/responsive';
import Typography from '../components/Typography';
import {
  addMovieToFavorites,
  isMovieFavorite,
  removeMovieFromFavorites,
} from '../utils/helper';

const MovieDetailScreen = ({route}: any) => {
  const id = route?.params?.id;
  const {data, refetch, isLoading, isRefetching} = useGetMovieIdQuery(id);

  const [favorite, setFavorite] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
      setFavorite(isMovieFavorite(data?.id));
    }, [data]),
  );

  const addRemoveFavorites = () => {
    if (isMovieFavorite(data?.id)) {
      setFavorite(false);
      removeMovieFromFavorites(data?.id);
    } else {
      setFavorite(true);
      addMovieToFavorites(data);
    }
  };

  return isLoading || isRefetching ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  ) : (
    <MainLayout>
      <Image
        source={{uri: data?.poster}}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.5}}
      />
      <View style={styles.detailsView}>
        <View>
          <Typography size={20}>{data?.title}</Typography>
          <Typography size={16} marginTop={8}>
            {data?.year}
          </Typography>
          <Typography
            style={{minWidth: '70%', maxWidth: '90%'}}
            size={16}
            marginTop={8}>
            {data?.plot}
          </Typography>
        </View>
        <TouchableOpacity
          onPress={addRemoveFavorites}
          hitSlop={{
            top: 10,
            bottom: 10,
            right: 10,
            left: 10,
          }}>
          <Icon
            style={{marginTop: responsive(10)}}
            name={favorite ? 'heart' : 'heart-o'}
            size={18}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  detailsView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(24),
    marginVertical: responsive(20),
  },
});

export default MovieDetailScreen;
