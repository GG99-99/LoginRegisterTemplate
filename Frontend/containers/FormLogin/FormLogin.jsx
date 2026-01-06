
// import { text } from "express";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import './FormLogin.css'
export let FormLogin = () => {
     let styleBtn= {
               textAlign: "center",
               backgroundColor: "#05a505b5",
               color: "white",
               fontWeight: 900
          }
     
     return(
          <Container id="LoginCont" w="100vw" h="100vh"> 
               <div className="card" id="LoginCard">
                    <Input txt="Cedula" inputID="CedulaInput" inputPlch=""/>
                    <Input txt="Clave" inputID="KeyInput" inputPlch=""/>
                    <Button txt="Enviar" style={styleBtn}></Button>
               </div>
          </Container>
          
     )
}
