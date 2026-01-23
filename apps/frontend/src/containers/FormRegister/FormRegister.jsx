// import { text } from "express";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handle } from "../../../../shared/src/utils/handle";
import { BoldP } from "../../components/BoldP/BoldP";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { TxtCard } from "../../components/TxtCard/TxtCard";
import { Container } from "../../components/Container/Container";
import axios from "axios";

import "../FormLogin/FormLogin.css";

export let FormRegister = () => {
    const navigate = useNavigate();

    const [warningTxt, setWarningTxt] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [register, setRegister] = useState(
                    {cedula: "",
                    password: "",
                    firstName: "",
                    lastName: ""})


    /*****************
    |   INLINE STYLE  |
     *****************/
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



    /***********************************************
    |   UPDATE THE REGISTER STATE ON INPUT CHANGES  |
     ***********************************************/

    const handleChange = ({target: {name, value}}) => {
        setRegister({...register, [name]: value})
    }


    /****************************
    |   HANDE CLICK ON SEND BTN  |
     ****************************/

    const handleClick = async () => {
        if(areEmptyField(register, setIsValid, setWarningTxt)) return;
        let [sendErr, data] = await handle(sendData(register, setIsValid, setWarningTxt, navigate)) 
        if(sendErr) { console.error("Error en registro:", sendErr);}
    };




    /***********************
    |   RETURNED COMPONENT  |
     ***********************/

    return (
        <Container className="LoginCont" w="100vw" h="100vh">
            <div className="card LoginCard">

                <BoldP >Registro</BoldP>

                <TxtCard txt={warningTxt} style={styleTxtCard} />

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
                    type="password"
                />

                <Button txt="Enviar" style={styleBtn} onClick={handleClick} />
            </div>
        </Container>
    );
};



async function sendData(registerState, setIsValid, setWarningTxt,  navigate) {


        // validar que la data no haiga ningun campo empty
    
        if (!validateCedula(registerState.cedula) ) {
            setIsValid(false);
            setWarningTxt("Formato incorrecto en la cedula")
            return;
        }
        
        let [resErr, res] = await handle(axios.post("/api/register", registerState));
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

function isEmpty(data) {
  // Verificar que el password no esté vacío
  if (data.trim() === "") return true;
   return false;
}

function areEmptyField(registerState, setIsValid, setWarningTxt){
    for( let [key, value] of Object.entries(registerState)){
        if(isEmpty(value)){
            setIsValid(false)

            if(key === "firstName") setWarningTxt(`El campo de nombre esta vacio`);
            else if(key === "lastName") setWarningTxt(`El campo de apellido esta vacio`);
            else if(key === "password") setWarningTxt(`El campo de clave esta vacio`);
            else setWarningTxt(`El campo ${key} esta vacio`);


            
            return true
            break
        }
    }

    return false
}

function validateCedula(cedula){
    if (!/^\d+$/.test(cedula)) return false;
     return true;
}