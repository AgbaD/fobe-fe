import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string;
  setToken: (data: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (data: boolean) => void;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };  
  setUser: (data: AuthContextType["user"]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => null,
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  setUser: () => null,
  logout: () => null,
});

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState<string>(localStorage.getItem("AUTH_TOKEN") || "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType["user"]>(() => {
    try {
      return JSON.parse(localStorage.getItem("USER") || "");
    } catch {
      return {
        firstName: "",
        lastName: "",
        email: "",
      };
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("AUTH_TOKEN", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("AUTH_TOKEN");
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    if (user.email) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  }, [user]);

  const logout = () => {
    setToken("");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
    });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}