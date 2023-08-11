import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import WrapperInput from "../molecules/WrapperInput";
import LineTop from "../../assets/img/LineTop.svg"
import LineBottom from "../../assets/img/LineBottom.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'
import Swal from 'sweetalert2'

function FormLogin() {
    const navigate = useNavigate();

    const form = useRef()
    const endpoint = 'http://localhost:4000/api/signin'; // 44.207.54.43
    
    const handlerClick = (e)=>{
        e.preventDefault();
        const loginForm = new FormData(form.current)
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginForm.get('email'),
                password: loginForm.get('password')
            })
        }
        
        fetch(endpoint, options) 
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                navigate("/home");
              }else{
                if(data.error == undefined) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title:"Contraseña incorrecta",
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{
                    Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: data.error.details[0].message,
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
               
              }
        });
    }

    return ( 
        <>
        <img src={LineTop} alt="" className="elipce-superior" />
        <img src={LineBottom} alt="" className="elipce-inferior" />
        <img src={Logo} alt="Logo de FelicitArte" />
        <div className="box-form">
            <form ref={form} className="form_reg" >
                <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
                <WrapperInput msn={"Contraseña"} type={"password"} placeholder={""} name={"password"} />

                <span className="textlink">Si aun no tienes una cuenta con nosotros, <NavLink className="link" to="/">Registrate</NavLink></span>
                <div className="button-login">
                    <button className="btn" onClick={handlerClick}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
     );
}

export default FormLogin;