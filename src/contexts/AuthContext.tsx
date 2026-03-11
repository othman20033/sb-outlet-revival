import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://127.0.0.1:8000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('sb-auth-token');
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('sb-auth-token');
  });

  const login = async (password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: 'admin@sboutlet.com', password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem('sb-auth-token', data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error', error);
      }
    }
    
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('sb-auth-token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
