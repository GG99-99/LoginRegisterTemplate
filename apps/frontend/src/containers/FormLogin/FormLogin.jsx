// import { text } from "express";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handle } from "../../../utils/promises/handle";
import { BoldP } from "../../components/BoldP/BoldP";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { TxtCard } from "../../components/TxtCard/TxtCard";
import { Container } from "../../components/Container/Container";
import axios from "axios"

import "./FormLogin.css";

export let FormLogin = () => {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [warningTxt, setWarningTxt] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate()
   

    let styleBtn = {
        textAlign: "center",
        backgroundColor: "#05a505b5",
        color: "white",
        fontWeight: 900,
    };

    let styleTxtCard = {
        display: isValid? "none": "flex",
        color: "white",
        fontWeight: "600",
        backgroundColor: "var(--warning-txt-background)"
    }

    const handleClick = async () => {
        let [sendErr, data] = await handle(
            sendData({ 
                cedula: cedula, 
                password: password,
                setIsValid: setIsValid, 
                setWarningTxt: setWarningTxt,
                navigate: navigate
                    }))
        if(sendErr) console.error("Error en login:", sendErr);
        
    }

    return (
        <Container className="LoginCont" w="100vw" h="100vh">
            <div className="card LoginCard">
                <BoldP >Inicio de sesion</BoldP>

                <TxtCard txt={warningTxt} style={styleTxtCard} />

                <Input
                    txt="Cedula"
                    valid={isValid}
                    onChange={(e) => setCedula(e.target.value)}
                />

                <Input
                    txt="Clave"
                    valid={isValid}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    txt="Enviar"
                    style={styleBtn}
                    onClick={handleClick}
                />
            </div>
        </Container>
    );
};

async function sendData({ cedula, password , setIsValid, setWarningTxt, navigate }) {

    if (!validateEnty(cedula)){
        setIsValid(false); 
        setWarningTxt("La cedula no puede estar vacia")
        return;
    }

    if(!validateCedula(cedula)){
        setIsValid(false); 
        setWarningTxt("Solo numeros en la cedula")
        return;
    }
    
    if (!validateEnty(password)){
        setIsValid(false); 
        setWarningTxt("La clave no puede estar vacia")
        return;
    }

    

    let data = { cedula, password };
    let [resErr, res] = await handle(axios.post("/api/login", data))

    if(resErr){
        if (resErr.response?.status === 401) {
            // resErr.response.data = {error, message}
            console.log(resErr.response.data)
            setWarningTxt(resErr.response.data.message)
            setIsValid(false); 
            return;}
    }

    navigate("/home");
        
   
    
    
}

function validateEnty(data) {
  // Verificar que el password no esté vacío
  if (data.trim() === "") return false;
   return true;
}

function validateCedula(cedula){
    if (!/^\d+$/.test(cedula)) return false;
     return true;
}
