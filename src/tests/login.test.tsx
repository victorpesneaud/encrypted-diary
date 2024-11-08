import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../pages/LoginPage';

test('modifie le texte après un clic sur le bouton', () => {
  render(<LoginPage />);
  expect(screen.getByText(/votre_mot_de_passe/i)).toBeInTheDocument();
  const passwordInput = screen.getByPlaceholderText('Entrez votre mot de passe');
  fireEvent.change(passwordInput, { target: { value: 'votre_mot_de_passe' } });
  const loginButton = screen.getByText('Se connecter');
  fireEvent.click(loginButton);
  expect(screen.getByText('Write a New Entry')).toBeInTheDocument();
});