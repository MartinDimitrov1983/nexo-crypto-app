import { Exchange, Sort, SORTING_TYPES } from '../types';

export const sortArray = (arr: Exchange[], sort: Sort) => {
    arr.sort((a, b) => {
        if (sort.order === SORTING_TYPES.ASCENDING) {
            if (a.price === 0) {
                return 1;
            } else if (b.price === 0) {
                return -1;
            }

            return a.price - b.price;
        }

        return b.price - a.price;
    });
};
