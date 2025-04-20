import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {responsive} from '../utils/theme/responsive';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FavoriteCardProps {
  movie: {
    id: string | number;
    title: string;
    year: string;
    poster: string;
  };
  heartPress?: () => void;
  hideHeartIcon?: boolean;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  movie,
  heartPress,
  hideHeartIcon,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: movie.poster}} style={styles.posterImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>
      </View>

      {hideHeartIcon ? null : (
        <TouchableOpacity onPress={heartPress} style={styles.heartIcon}>
          <Icon name="heart" size={16} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: responsive(12),
    marginVertical: responsive(16),
    marginHorizontal: responsive(4),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  posterImage: {
    width: responsive(60),
    height: responsive(60),
    borderRadius: responsive(8),
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: responsive(12),
    justifyContent: 'center',
  },
  title: {
    fontSize: responsive(16),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  year: {
    fontSize: responsive(14),
    color: '#555',
  },
  heartIcon: {
    position: 'absolute',
    top: responsive(8),
    right: responsive(8),
  },
});
