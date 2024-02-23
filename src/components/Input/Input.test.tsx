import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

test('Snapshot Input', () => {
    const { asFragment } = render(
        <Input
            id="test"
            labelName="test"
            value="test"
            handleOnChange={() => {}}
        />,
    );
    expect(asFragment()).toMatchSnapshot();
});
