import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Swal from 'sweetalert2'
import { changePassword } from "../../api/user";
import WrapperInput from "../molecules/WrapperInput";
import LineTop from "../../assets/img/LineTop.svg"
import LineBottom from "../../assets/img/LineBottom.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'

function FormRecovery() {
    const navigate = useNavigate();
    const form = useRef();
    
    const handlerClick = async(e)=>{
        e.preventDefault();
        const changeForm = new FormData(form.current);
        const newPassword = changeForm.get('newPassword');
        const confirmPassword = changeForm.get('confirmPassword');
        const email = changeForm.get('email');

        if (newPassword !== confirmPassword) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Las contraseñas no coinciden",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            const user = {
                email: email,
                password: newPassword
            };
            const response = await changePassword(user);
            console.log(response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Contraseña cambiada exitosamente",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/login");
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Ocurrio un error. Contraseña o Correo incorrecto",
                showConfirmButton: false,
                timer: 1500
            });
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
                <WrapperInput msn={"Correo"} type={"email"} placeholder={""} name={"email"} />
                <WrapperInput msn={"Nueva contraseña"} type={"password"} placeholder={""} name={"newPassword"} />
                <WrapperInput msn={"Confirmar contraseña"} type={"password"} placeholder={""} name={"confirmPassword"} />

                <div className="buttons">
                    <button className="btn" onClick={handleCancel}>Regresar</button>
                    <button className="btn" onClick={handlerClick}>Cambiar</button>
                </div>
            </form>
        </div>
    </>
     );
}

export default FormRecovery;
