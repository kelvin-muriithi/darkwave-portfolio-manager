
// Authentication constants
export const AUTH_TOKEN_KEY = 'portfolio_auth_token';

// Simple authentication check - in a real app, this would validate with a backend
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

// Login function - in a real app, this would validate credentials with a backend
export const login = (username: string, password: string): boolean => {
  // Add your hardcoded credentials here (this is just for demo purposes)
  // In a real application, this should be handled securely on a backend
  if (username === "admin" && password === "password123") {
    localStorage.setItem(AUTH_TOKEN_KEY, 'demo_token');
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
