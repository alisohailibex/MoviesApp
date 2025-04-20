import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINT} from '../config/endpoints';
import moviesHttp from '../config/movies-http';

async function getMovieById(id?: number) {
  const {data} = await moviesHttp.get(
    `${API_ENDPOINT.MOVIES.GET_MOVIE_BY_ID}${id}`,
  );
  return data;
}

export const useGetMovieIdQuery = (id?: number) => {
  return useQuery({
    queryKey: [API_ENDPOINT.MOVIES.GET_MOVIE_BY_ID],
    queryFn: () => getMovieById(id),
  });
};
