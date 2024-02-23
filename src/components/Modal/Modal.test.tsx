import React from 'react';
import { render } from '@testing-library/react';

import Modal from './Modal';

test('Snapshot Modal', () => {
    const { asFragment } = render(
        <Modal
            isOpen={false}
            onClose={() => {}}
            header="test"
            isLoading={true}
            children={null}
        />,
    );
    expect(asFragment()).toMatchSnapshot();
});
