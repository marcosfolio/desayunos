import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Switch from './Switch';

describe('Switch', () => {
    const handleChange = jest.fn();

    // Group common test props and render function
    const defaultProps = {
        checked: false,
        onChange: handleChange,
        label: 'Toggle me',
    };

    const renderSwitch = (props = {}) => {
        return render(<Switch {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Group related tests using nested describe blocks
    describe('rendering', () => {
        it('renders a checkbox input', () => {
            renderSwitch();
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
        });

        it('renders with a label', () => {
            renderSwitch();
            expect(screen.getByText('Toggle me')).toBeInTheDocument();
        });

        it('does not render label when not provided', () => {
            renderSwitch({ label: undefined });
            expect(screen.queryByText('Toggle me')).not.toBeInTheDocument();
        });

        it('applies custom className when provided', () => {
            const { container } = renderSwitch({ className: 'custom-class' });
            expect(container.firstChild).toHaveClass('custom-class');
        });
    });

    describe('interaction', () => {
        it('calls onChange handler when clicked', async () => {
            renderSwitch();
            const checkbox = screen.getByRole('checkbox');

            await userEvent.click(checkbox);

            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith(true);
        });

        it('reflects the checked state', () => {
            renderSwitch({ checked: true });
            expect(screen.getByRole('checkbox')).toBeChecked();
        });
    });

    describe('accessibility', () => {
        it('can be disabled', () => {
            renderSwitch({ disabled: true });
            expect(screen.getByRole('checkbox')).toBeDisabled();
        });

        it('does not call onChange when disabled', async () => {
            renderSwitch({ disabled: true });
            await userEvent.click(screen.getByRole('checkbox'));
            expect(handleChange).not.toHaveBeenCalled();
        });

        it('maintains accessibility attributes', () => {
            renderSwitch({ checked: true, disabled: true });
            const checkbox = screen.getByRole('checkbox');

            expect(checkbox).toHaveAttribute('aria-checked', 'true');
            expect(checkbox).toHaveAttribute('aria-disabled', 'true');
        });
    });
}); 