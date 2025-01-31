import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectInput from './SelectInput';

describe('SelectInput', () => {
    const mockOnChange = jest.fn();
    const generateOptions = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            value: `option${i + 1}`,
            label: `Option ${i + 1}`
        }));
    };

    const createProps = (optionsCount = 2) => ({
        value: '',
        onChange: mockOnChange,
        options: generateOptions(optionsCount),
        className: 'test-select'
    });

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it('renders all options', () => {
        const props = createProps(3);
        render(<SelectInput {...props} />);

        props.options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('applies custom className', () => {
        render(<SelectInput {...createProps()} />);
        expect(screen.getByRole('combobox')).toHaveClass('test-select');
    });

    it('calls onChange when selection changes', () => {
        const props = createProps(4);
        render(<SelectInput {...props} />);

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: props.options[1].value }
        });

        expect(mockOnChange).toHaveBeenCalledWith(props.options[1].value);
    });

    it('shows selected value', () => {
        const props = createProps(2);
        render(
            <SelectInput
                {...props}
                value={props.options[0].value}
            />
        );

        expect(screen.getByRole('combobox')).toHaveValue(props.options[0].value);
    });
});
