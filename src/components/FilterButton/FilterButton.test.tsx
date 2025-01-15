import React from 'react';
import FilterButton from './FilterButton';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FilterButton', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders with correct text', () => {
        render(
            <FilterButton
                type="protein"
                selectedType="all"
                onClick={mockOnClick}
            >
                Test Filter Button
            </FilterButton>
        );

        expect(screen.getByText('Test Filter Button')).toBeInTheDocument();
    });

    it('has active class when type matches selectedType', () => {
        render(
            <FilterButton
                type="protein"
                selectedType="protein"
                onClick={mockOnClick}
            >
                Test Filter Button
            </FilterButton>
        );

        const button = screen.getByRole('button');
        expect(button.classList.contains('active')).toBe(true);
    });

    it('does not have active class when type differs from selectedType', () => {
        render(
            <FilterButton
                type="protein"
                selectedType="all"
                onClick={mockOnClick}
            >
                Test Filter Button
            </FilterButton>
        );

        const button = screen.getByRole('button');
        expect(button.classList.contains('active')).toBe(false);
    });

    it('calls onClick handler with correct type when clicked', () => {
        render(
            <FilterButton
                type="test-type"
                selectedType="all"
                onClick={mockOnClick}
            >
                Test Filter Button
            </FilterButton>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockOnClick).toHaveBeenCalledWith('test-type');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
}); 