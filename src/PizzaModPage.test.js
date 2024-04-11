import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PizzaModPage from './PizzaModPage';

describe('PizzaModPage', () => {
    test('updates pizza via PUT request', async () => {
        const pizza = {
            id: 1,
            name: 'Négysajtos pizza',
            isGlutenFree: false,
            kepURL: 'https://example.com/image.jpg'
        };

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => Promise.resolve(pizza)
        });

        const updatedPizza = {
            id: 1,
            name: 'New Margarita',
            isGlutenFree: true,
            kepURL: 'https://example.com/image.jpg'
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => Promise.resolve(updatedPizza)
        });

        render(
            <MemoryRouter initialEntries={['/pizza/1']}>
                <Routes>
                    <Route path="/pizza/:pizzaId" element={<PizzaModPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByLabelText('Pizza név:').value).toBe('Négysajtos pizza');
        });

        const nameInput = screen.getByLabelText('Pizza név:');
        fireEvent.change(nameInput, { target: { value: 'New Margarita' } });

        fireEvent.submit(screen.getByRole('button', { name: 'Küldés' }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'https://pizza.kando-dev.eu/Pizza/1',
                expect.objectContaining({
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 1,
                        name: 'New Margarita',
                        isGlutenFree: false,
                        kepURL: 'https://example.com/image.jpg'
                    })
                })
            );
        });

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });
});
