/**
 * skenario testing
 *
 * - LoginInput component
 *  - should handle username type correctly
 *  - should handle password type correctly
 *  - should call login function when login button is clicked
 */

import React from 'react';
import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LoginInput from './LoginInput';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username type correcly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    // Action
    await userEvent.type(usernameInput, 'usernametest');

    // Assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password type correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      id: 'usernametest',
      password: 'passwordtest',
    });
  });
});