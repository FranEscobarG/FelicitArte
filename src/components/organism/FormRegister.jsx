import { NavLink } from "react-router-dom";
import WrapperInput from "../molecules/WrapperInput";
import ElipceSuperior from "../../assets/img/EllipseReg1.svg"
import ElipceInferior from "../../assets/img/EllipseReg2.svg"
import '../../assets/styles/formRegister.css'

function FormRegister() {
  return (
    <>
        <img src={ElipceSuperior} alt="" className="elipce-superior" />
        <img src={ElipceInferior} alt="" className="elipce-inferior" />
        <div className="box-form">
        <form className="form_reg" >
            <WrapperInput msn={"Nombre completo"} type={"text"} placeholder={""} name={"name"} />
            <WrapperInput msn={"Genero"} type={"text"} placeholder={""} name={"gender"} />
            <WrapperInput msn={"Fecha de nacimiento"} type={"date"} placeholder={""} name={"birthdate"} />
            <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
            <WrapperInput msn={"Contraseña"} type={"password"} placeholder={""} name={"password"} />

            <span className="textlink">Si ya tienes una cuenta con nosotros, <NavLink className="link" to="/login">Inicia sesión</NavLink></span>
            <div className="buttons">
                <button className="btn">Aceptar</button>
                <button className="btn">Cancelar</button>
            </div>
        </form>
        </div>
    </>
  );
}

export default FormRegister;
