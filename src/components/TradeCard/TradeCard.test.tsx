import React from 'react';
import { TRADE_TYPES } from '../../types/commonTypes';
import { render } from '@testing-library/react';

import TradeCard from './TradeCard';

test('Snapshot TradeCard', () => {
    const { asFragment } = render(
        <TradeCard tradeType={TRADE_TYPES.buy} price="test" amount="test" />,
    );
    expect(asFragment()).toMatchSnapshot();
});
