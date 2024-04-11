import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Importáljuk a Routes és Route komponenseket
import PizzaDelPage from './PizzaDelPage';

describe('PizzaDelPage', () => {
    test('deletes pizza and navigates to home page', async () => {
        const pizza = {
            id: 1,
            name: 'Margarita',
            isGlutenFree: false,
            kepURL: 'https://example.com/image.jpg'
        };

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => Promise.resolve(pizza)
        });

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true
        });

        render(
            <MemoryRouter initialEntries={['/del-pizza/1']}>
                <Routes>
                    <Route path="/del-pizza/:pizzaId" element={<PizzaDelPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Törlendő elem: Margarita')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Törlés'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'https://pizza.kando-dev.eu/Pizza/1',
                expect.objectContaining({
                    method: 'DELETE'
                })
            );
        });

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });
});
