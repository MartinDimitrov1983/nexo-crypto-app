import React from 'react';
import { render } from '@testing-library/react';

import Form from './Form';

test('Snapshot Form', () => {
    const { asFragment } = render(
        <Form handleSearch={() => {}} handleOnChange={() => {}} value="test" />,
    );
    expect(asFragment()).toMatchSnapshot();
});
