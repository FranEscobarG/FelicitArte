import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import Swal from 'sweetalert2'
import UserContext from "../../context/UserContext";
import { loginUser } from "../../api/user";
import WrapperInput from "../molecules/WrapperInput";
import LineTop from "../../assets/img/LineTop.svg"
import LineBottom from "../../assets/img/LineBottom.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'

function FormLogin() {
    const navigate = useNavigate();
    const {isLoged, setIsLoged} = useContext(UserContext);
    const { setUserName } = useContext(UserContext);
    const form = useRef()
    
    const handlerClick = async(e)=>{
        e.preventDefault();
        try{
            const loginForm = new FormData(form.current);
            let user = {
                email: loginForm.get('email'),
                password: loginForm.get('password')
            }
            const response = await loginUser(user);
            console.log(response.data);
            setIsLoged(true);
            setUserName(response.data.fullName); 
            navigate("/home");
        }catch(error){
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Contraseña o Correo incorrecto",
                showConfirmButton: false,
                timer: 1500
              })
        }
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
                <span className="textlink">¿Olvidaste tu contraseña? <NavLink className="link" to="/recovery">Cambiar contraseña</NavLink></span>
                <div className="button-login">
                    <button className="btn" onClick={handlerClick}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
     );
}

export default FormLogin;