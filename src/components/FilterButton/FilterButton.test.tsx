import React from 'react';
import FilterButton from './FilterButton';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FilterButton', () => {
    const mockOnClick = jest.fn();

    const defaultProps = {
        type: 'test-type',
        selectedType: 'all',
        onClick: mockOnClick,
        children: 'Test Filter Button'
    };

    type FilterButtonProps = {
        type: string;
        selectedType: string;
        onClick: (type: string) => void;
        children?: React.ReactNode;
    };

    const renderFilterButton = (overrideProps: Partial<FilterButtonProps> = {}) => {
        const props = { ...defaultProps, ...overrideProps };
        return render(
            <FilterButton {...props}>
                {props.children}
            </FilterButton>
        );
    };

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders with correct text', () => {
        renderFilterButton();
        expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
    });

    it('handles active state correctly', () => {
        // Active case
        const { unmount } = renderFilterButton({ selectedType: 'test-type' });
        const activeButton = screen.getByRole('button');
        expect(activeButton).toHaveClass('active');
        unmount(); // <-- This line unmounts the first button

        // Inactive case
        renderFilterButton({ selectedType: 'all' });
        const inactiveButton = screen.getByRole('button');
        expect(inactiveButton).not.toHaveClass('active');
    });

    it('calls onClick handler with correct type when clicked', () => {
        renderFilterButton({ type: 'test-type' });
        fireEvent.click(screen.getByRole('button'));
        expect(mockOnClick).toHaveBeenCalledWith('test-type');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
}); 