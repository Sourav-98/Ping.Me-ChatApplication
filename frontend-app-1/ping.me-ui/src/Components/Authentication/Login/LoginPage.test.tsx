import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import AlertContext, { AlertContextProvider } from 'Context/AlertContext/AlertContext';
import { AlertObjectType } from 'Context/AlertContext/AlertContextType';
import { BrowserRouter as Router } from 'react-router-dom';

test('Login Page Validation', () => {
    render(
        <Router>
            <AlertContext.Provider value={{
                getAlerts: (): Array<AlertObjectType> => { return [] },
                pushAlert: (alert: AlertObjectType): void => { },
                removeAlert: (alertId?: string): void => { },
                removeLastAlert: (): void => { },
                toggleBackdropOn: (): void => { },
                toggleBackdropOff: (): void => { },
                getBackdropStatus: (): boolean => false
            }}>
                <LoginPage />
            </AlertContext.Provider>
        </Router>

    );
    // let loginButton = screen.getByRole('login-button');
    // expect(loginButton).toBeInTheDocument();
})