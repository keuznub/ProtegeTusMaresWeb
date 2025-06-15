// context/UserContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/User';



type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  validateUser: (userTokken: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const validateUser = () => {

  }


  return <UserContext.Provider value={{ user, setUser, validateUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
