import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectInput from './SelectInput';

describe('SelectInput', () => {
    const mockOnChange = jest.fn();
    const defaultProps = {
        value: '',
        onChange: mockOnChange,
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ],
        className: 'test-select'
    };

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it('renders all options', () => {
        render(<SelectInput {...defaultProps} />);
        
        defaultProps.options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('applies custom className', () => {
        render(<SelectInput {...defaultProps} />);
        expect(screen.getByRole('combobox')).toHaveClass('test-select');
    });

    it('calls onChange when selection changes', () => {
        render(<SelectInput {...defaultProps} />);
        
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: 'option2' }
        });

        expect(mockOnChange).toHaveBeenCalledWith('option2');
    });

    it('shows selected value', () => {
        render(
            <SelectInput 
                {...defaultProps} 
                value="option1"
            />
        );
        
        expect(screen.getByRole('combobox')).toHaveValue('option1');
    });
});
