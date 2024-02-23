export const parsePrice = (price: string | undefined) => {
    return parseFloat(price || '') || 0;
};
