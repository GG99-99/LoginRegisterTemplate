import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const  handle = async (promise) => {
    return promise
        .then(data => [null, data])
        .catch(err => [err, null]);
    }

// tienes que retornar el sidebar aqui
export function CheckJWT() {
	let [validJWT, setValidJWT] = useState(null)

    useEffect(() => {
        const validateJWT = async () => {

            let [resErr, res] = await handle(axios.get("api/validate"))
            if(resErr || !res || res.status !== 200){
                setValidJWT(false)
                return
            }
                
            if (res.status === 200) {
                setValidJWT(true)
                return
            }
			
            
        };

        validateJWT();
    }, []);


    if (validJWT === null) return <div>Cargando.....</div>;
    if(validJWT) return <Navigate to="/home" replace/> ;

    return <Outlet/> 
}
