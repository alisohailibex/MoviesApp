import {useMutation} from '@tanstack/react-query';
import {API_ENDPOINT} from '../config/endpoints';
import http from '../config/http';

async function signIn(payload: any) {
  const {data} = await http.post(API_ENDPOINT.AUTH.Sign_IN, payload);

  return data;
}

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
