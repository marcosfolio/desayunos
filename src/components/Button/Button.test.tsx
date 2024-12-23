import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        onClick: mockOnClick,
        className: 'test-class',
        text: 'Test Button'
    };

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders with the correct text', () => {
        render(<Button {...defaultProps} />);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('applies the provided className', () => {
        render(<Button {...defaultProps} />);
        expect(screen.getByRole('button')).toHaveClass('test-class');
    });

    it('calls onClick handler when clicked', () => {
        render(<Button {...defaultProps} />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
}); 