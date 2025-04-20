import {useMutation} from '@tanstack/react-query';
import {API_ENDPOINT} from '../config/endpoints';
import http from '../config/http';

async function signUp(payload: any) {
  const {data} = await http.post(API_ENDPOINT.AUTH.Sign_UP, payload);

  return data;
}

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
