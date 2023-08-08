import { NavLink } from "react-router-dom";
import WrapperInput from "../molecules/WrapperInput";
import LineTop from "../../assets/img/LineTop.svg"
import LineBottom from "../../assets/img/LineBottom.svg"
import '../../assets/styles/formRegister.css'

function FormLogin() {
    return ( 
        <>
        <img src={LineTop} alt="" className="elipce-superior" />
        <img src={LineBottom} alt="" className="elipce-inferior" />
        <div className="box-form">
            <form className="form_reg" >
                <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
                <WrapperInput msn={"Contraseña"} type={"password"} placeholder={""} name={"password"} />

                <span className="textlink">Si aun no tienes una cuenta con nosotros, <NavLink className="link" to="/">Registrate</NavLink></span>
                <div className="button-login">
                    <button className="btn">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
     );
}

export default FormLogin;