// import { text } from "express";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handle } from "../../../utils/promises/handle";
import { BoldP } from "../../components/BoldP/BoldP";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import axios from "axios";

import "../FormLogin/FormLogin.css";

export let FormRegister = () => {
    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [register, setRegister] = useState(
                    {cedula: "",
                    password: "",
                    firstName: "",
                    lastName: ""})

    let styleBtn = {
        textAlign: "center",
        backgroundColor: "#05a505b5",
        color: "white",
        fontWeight: 900,
    };

    const handleChange = ({target: {name, value}}) => {
        setRegister({...register, [name]: value})
    }

    const handleClick = async () => {
        try { await sendData(register, setIsValid);} 
        catch (error) { console.error("Error en login:", error);}
    };

    return (
        <Container className="LoginCont" w="100vw" h="100vh">
            <div className="card LoginCard">

                <BoldP >Registro</BoldP>
                
                <Input
                    txt="Nombre"
                    valid={isValid}
                    name="firstName"
                    onChange={handleChange}
                />

                <Input
                    txt="Apellido"
                    valid={isValid}
                    name="lastName"
                    onChange={handleChange}
                />

                <Input
                    txt="Cedula"
                    valid={isValid}
                    name="cedula"
                    onChange={handleChange}
                />

                {/* aqui tengo que crear un boton de default para saber si va a otorgar la clave by default*/}
                <Input
                    txt="Clave"
                    valid={isValid}
                    name="password"
                    onChange={handleChange}
                />

                <Button txt="Enviar" style={styleBtn} onClick={handleClick} />
            </div>
        </Container>
    );
};

async function sendData(data, setIsValid) {
    
        if (!validateData(data)) {
            setIsValid(false);
            return;
        }
        
        let [resErr, res] = await axios.post("/api/register", data);
        if(resErr){
            if (resErr.response?.status === 401) {
                console.log("bad register");
                setIsValid(false);
            }
        }

        // res.data {ok, error}
        if(res.data.ok){
            navigate('/login')
        }
    
}

function validateData(data) {
    // Verificar que la cédula tenga exactamente 11 caracteres
    //   if (cedula.length !== 11) return false;

    // Verificar que todos los caracteres sean dígitos
    if (!/^\d+$/.test(data.cedula)) return false;

    // Verificar que el password, el name y el lastName no esten vacios
    if (data.firstName.trim() === "" || data.lastName.trim() === "") return false;

    return true;
}
