import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

test('Snapshot Button', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
});
