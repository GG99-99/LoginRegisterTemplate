import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const  AuthProvider = ({children})=> {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     
     return (
          <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
               {children}
          </AuthContext.Provider>
     )
}

// custom hock para usar AuthContext
export const useAuth = () =>{
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error('useAuth debe usarse dentro de AuthProvider');
     }
     return context;
}