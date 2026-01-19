import { data, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

// tienes que retornar el sidebar aqui
export function ValidateJWT() {
	const { setUser, setLoading, loading } = useAuth();
	const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const validateJWT = async () => {
            try {
                let res = await axios.get("api/validate");

                if (res.status === 200) {
                    setUser(res.data)
                    setIsAuthenticated(true)
                }
			 
            } catch (e) {
			if (e.response?.status === 401) {
				setUser(null)
          		setIsAuthenticated(false);
        	}		
		    }finally{
			    setLoading(false)
		    }

            
        };

        validateJWT();
    }, [setUser, setLoading]);


    if (loading || isAuthenticated === null) return <div>Cargando...</div>;
    if(!isAuthenticated) return <Navigate to="/login" />;

    return <Outlet/>
}
