import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StaticRouter } from 'react-router-dom/server';
import '@testing-library/jest-dom';
import HeaderMenu from './HeaderMenu';
import { MENU_ITEMS } from '../../helpers/menuItems';

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

        expect(screen.getByText(MENU_ITEMS.HOME.es)).toBeInTheDocument();
        expect(screen.getByText(MENU_ITEMS.SHOPPING.es)).toBeInTheDocument();
        expect(screen.getByText(MENU_ITEMS.MENU_COMPOSER.es)).toBeInTheDocument();
        expect(screen.getByText(MENU_ITEMS.FOOD_AND_PORTIONS.es)).toBeInTheDocument();
    });

    it('renders links with correct paths', () => {
        renderHeader();

        expect(screen.getByText(MENU_ITEMS.HOME.es).closest('a'))
            .toHaveAttribute('href', MENU_ITEMS.HOME.path);
        expect(screen.getByText(MENU_ITEMS.SHOPPING.es).closest('a'))
            .toHaveAttribute('href', MENU_ITEMS.SHOPPING.path);
        expect(screen.getByText(MENU_ITEMS.MENU_COMPOSER.es).closest('a'))
            .toHaveAttribute('href', MENU_ITEMS.MENU_COMPOSER.path);
        expect(screen.getByText(MENU_ITEMS.FOOD_AND_PORTIONS.es).closest('a'))
            .toHaveAttribute('href', MENU_ITEMS.FOOD_AND_PORTIONS.path);
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