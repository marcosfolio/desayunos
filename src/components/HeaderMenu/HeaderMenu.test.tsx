import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StaticRouter } from 'react-router-dom/server';
import '@testing-library/jest-dom';
import HeaderMenu from './HeaderMenu';

describe('HeaderMenu', () => {
    const renderHeader = (path = '/') => {
        return render(
            <StaticRouter location={path}>
                <HeaderMenu />
            </StaticRouter>
        );
    };

    it('renders all navigation links', () => {
        renderHeader();

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('La compra saludable')).toBeInTheDocument();
        expect(screen.getByText('Creador de menús')).toBeInTheDocument();
        expect(screen.getByText('¿Cómo comer?')).toBeInTheDocument();
    });

    it('renders links with correct paths', () => {
        renderHeader();

        expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('La compra saludable').closest('a')).toHaveAttribute('href', '/shopping');
        expect(screen.getByText('Creador de menús').closest('a')).toHaveAttribute('href', '/menu-composer');
        expect(screen.getByText('¿Cómo comer?').closest('a')).toHaveAttribute('href', '/food-and-portions');
    });

    it('has correct structure and styling', () => {
        const { container } = renderHeader();

        expect(container.querySelector('nav')).toHaveClass('header-menu');
        expect(container.querySelector('ul')).toHaveClass('menu-list');
        expect(container.querySelectorAll('a')).toHaveLength(4);
    });

    it('is keyboard accessible', async () => {
        renderHeader();
        const links = screen.getAllByRole('link');

        links[0].focus();
        expect(document.activeElement).toBe(links[0]);

        await userEvent.tab();
        expect(document.activeElement).toBe(links[1]);

        await userEvent.tab();
        expect(document.activeElement).toBe(links[2]);
    });
});