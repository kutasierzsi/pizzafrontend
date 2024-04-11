import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PizzaCreatePage from './PizzaCreatePage';

describe('PizzaCreatePage', () => {
    test('submits pizza creation form and navigates to home page', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true
        });

        render(
            <MemoryRouter>
                <PizzaCreatePage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Pizza név:'), { target: { value: 'Margarita' } });
        fireEvent.change(screen.getByLabelText('Gluténmentes:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Kép URL-je:'), { target: { value: 'https://example.com/image.jpg' } });

        fireEvent.submit(screen.getByRole('button', { name: 'Küldés' }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'https://pizza.kando-dev.eu/Pizza',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'Margarita',
                        isGlutenFree: 1,
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
