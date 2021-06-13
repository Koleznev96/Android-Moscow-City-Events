import {useState, useCallback} from 'react';

export const useSort = () => {
    const [listConveniences, setListConveniences] = useState(false);

    const changeListConveniences = useCallback((status) => {
        setListConveniences(!status);
    }, [setListConveniences]);

    return { listConveniences, changeListConveniences };
}
