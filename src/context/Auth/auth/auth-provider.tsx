import type {FC, PropsWithChildren} from 'react';
import {useCallback, useEffect, useMemo, useReducer} from 'react';
import React from 'react';

import {AuthContext, initialState} from './auth-context';
import type {State} from './auth-context';
import {queryClient, storage} from '../../../../App';

type User = {
  id: number;
  token: string;
  isAuthenticated: boolean;
};

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  SIGN_OUT = 'SIGN_OUT',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | LoginAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const {isAuthenticated, user} = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const {user} = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user: user,
    };
  },

  SIGN_OUT: (state: State): State => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    // Checking if user exist in local storage and authenticating it.
    try {
      const user = storage.getString('@authdata');
      if (user !== undefined && user !== null) {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: JSON.parse(user),
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  const login = useCallback(
    (user: User) => {
      storage.set('@authdata', JSON.stringify(user));

      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user,
        },
      });
      queryClient.invalidateQueries();
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    storage.delete('@authdata');
    dispatch({type: ActionType.SIGN_OUT});
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      login,
      signOut,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
