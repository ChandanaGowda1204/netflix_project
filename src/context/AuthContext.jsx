import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for persisted session on mount
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('netflix_user');
      }
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('netflix_users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
      };
      users.push(newUser);
      localStorage.setItem('netflix_users', JSON.stringify(users));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('netflix_users') || '[]');
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      setUser(userData);
      localStorage.setItem('netflix_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
