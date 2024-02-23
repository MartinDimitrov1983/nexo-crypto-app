export const sortOrder = (order: string) => `Sort price in ${order} order`;
export const pricePair = (pair: string | undefined, price: number) =>
    `1 ${pair?.toUpperCase()} = ${price}`;
