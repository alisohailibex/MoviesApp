import {useContext} from 'react';
import {AuthContext, AuthContextType} from './Auth/auth';

export const useAuth = <T = AuthContextType,>() => useContext(AuthContext) as T;
