import {createContext} from 'react';

type User = {
  id: number;
  token: string;
  isAuthenticated: boolean;
};

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export interface AuthContextType extends State {
  login: (user: User) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  signOut: () => {},
});
