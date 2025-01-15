import React from 'react';
import SelectInput from './SelectInput';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SelectInput', () => {
    it('renders with label', () => {
        render(
            <SelectInput
                label="Test Label"
                value=""
                onChange={() => { }}
                options={[]}
                isLoading={false}
                error={null}
                placeholder="Select an option"
            />
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
}); 