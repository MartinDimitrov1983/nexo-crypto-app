import React from 'react';
import { render } from '@testing-library/react';

import PairCard from './PairCard';

test('Snapshot PairCard', () => {
    const { asFragment } = render(
        <PairCard name="test" pair="test" price={10} onClick={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
});
