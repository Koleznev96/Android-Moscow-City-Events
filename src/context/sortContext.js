import {createContext} from 'react';

function noop() {}

export const SortContext = createContext({
    listConveniences: null,
    changeListConveniences: noop,
});
