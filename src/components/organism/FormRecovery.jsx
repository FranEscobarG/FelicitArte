import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Swal from 'sweetalert2'
import { loginUser } from "../../api/user";
import WrapperInput from "../molecules/WrapperInput";
import LineTop from "../../assets/img/LineTop.svg"
import LineBottom from "../../assets/img/LineBottom.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'

function FormRecovery() {
    const navigate = useNavigate();
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
            console.log(response);
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
    
    const handleCancel = (e)=>{
        e.preventDefault();
        navigate("/login");
      }

    return ( 
        <>
        <img src={LineTop} alt="" className="elipce-superior" />
        <img src={LineBottom} alt="" className="elipce-inferior" />
        <img src={Logo} alt="Logo de FelicitArte" />
        <div className="box-form">
            <form ref={form} className="form_reg" >
                <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
                <WrapperInput msn={"Nueva contraseña"} type={"password"} placeholder={""} name={"password"} />
                <WrapperInput msn={"Confirmar contraseña"} type={"password"} placeholder={""} name={"password"} />

                <div className="buttons">
                    <button className="btn" onClick={handleCancel}>Regresar</button>
                    <button className="btn" onClick={handlerClick}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
     );
}

export default FormRecovery;