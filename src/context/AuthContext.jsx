import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    // Estado inicial desde localStorage
    const storedUsuario = localStorage.getItem("usuario");
    return storedUsuario ? JSON.parse(storedUsuario) : null;
  });

  // Actualiza estado y localStorage
  const login = (usuarioData) => {
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    setUsuario(usuarioData);
    window.dispatchEvent(new Event('localStorageUpdated'));
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.dispatchEvent(new Event('localStorageUpdated'));
  };

  // Sincronización entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "usuario") {
        const newUsuario = e.newValue ? JSON.parse(e.newValue) : null;
        setUsuario(newUsuario);
      }
    };

    const handleCustomEvent = () => {
      const storedUsuario = localStorage.getItem("usuario");
      setUsuario(storedUsuario ? JSON.parse(storedUsuario) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleCustomEvent);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useAuth() {
  return useContext(AuthContext);
}