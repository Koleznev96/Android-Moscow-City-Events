import {createContext} from 'react';

function  noop() {}

export const AuthContext = createContext({
    token: 3,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    list: null
});