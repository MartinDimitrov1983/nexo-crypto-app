import React from 'react';
import { render } from '@testing-library/react';

import PageLayout from './PageLayout';

test('Snapshot PageLayout', () => {
    const { asFragment } = render(
        <PageLayout title="test" children={null} loading={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
});
