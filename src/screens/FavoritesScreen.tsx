import {FlatList, Text, View} from 'react-native';
import {storage} from '../../App';
import {getFavoriteMovies, removeMovieFromFavorites} from '../utils/helper';
import MainLayout from '../components/MainLayout';
import Typography from '../components/Typography';
import {responsive} from '../utils/theme/responsive';
import FavoriteCard from '../components/FavoriteCard';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

const FavoritesScreen = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);

  const handleRemoveFromFavorites = (id: number) => {
    removeMovieFromFavorites(id);
    const favoritesList = getFavoriteMovies();
    setFavoriteMovies(favoritesList);
  };

  useFocusEffect(
    useCallback(() => {
      const favoritesList = getFavoriteMovies();
      setFavoriteMovies(favoritesList);
    }, []),
  );

  return (
    <MainLayout sidePadding verticalPadding>
      <Typography
        marginTop={responsive(12)}
        align="center"
        size={24}
        weight="bold">
        Favorites
      </Typography>

      {favoriteMovies?.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Typography size={16} color="gray">
            No Favorites found
          </Typography>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          renderItem={({item}) => (
            <FavoriteCard
              movie={item}
              heartPress={() => handleRemoveFromFavorites(item?.id)}
            />
          )}
        />
      )}
    </MainLayout>
  );
};

export default FavoritesScreen;
