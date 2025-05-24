import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    nickname: 'Johnny',
    email: 'john@example.com',
    password: 'password123',
    discordName: 'john#1234',
    phone: '123-456-7890',
    birthdate: '1990-01-01',
    team: 'Engineering',
    discordId: '123456789',
    role: 'user',
    userId: 'U001',
    supervisorOrMentor: 'Jane Smith', // ✅ Add this
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    nickname: 'Janey',
    email: 'jane@example.com',
    password: 'password123',
    discordName: 'jane#5678',
    phone: '098-765-4321',
    birthdate: '1992-05-15',
    team: 'Design',
    discordId: '987654321',
    role: 'admin',
    userId: 'U002',
    supervisorOrMentor: 'John Doe', // ✅ Add this
  },
];


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const existingUser = mockUsers.find((u) => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // In a real app, this would be done on the server
      const newUser = {
        ...userData,
        id: `${mockUsers.length + 1}`,
      };
      
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

