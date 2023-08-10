import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import WrapperInput from "../molecules/WrapperInput";
import ElipceSuperior from "../../assets/img/EllipseReg1.svg"
import ElipceInferior from "../../assets/img/EllipseReg2.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'

function FormRegister() {
  const navigate = useNavigate();

    const form = useRef()
    const endpoint = 'http://localhost:4000/api/signup';  // 44.207.54.43

    const handlerClickReg = (e)=>{
        e.preventDefault();
        const regForm = new FormData(form.current)
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fullName: regForm.get('name'),
              gender: regForm.get('gender'),
              birthDate: regForm.get('birthdate'),
              email: regForm.get('email'),
              password: regForm.get('password')
            })
        }
        
        fetch(endpoint, options) 
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
              alert(data.message);
              navigate("/login");
            }
            else{
              alert(data.error);
            }
        });
    }

    const handleCancel = (e)=>{
      e.preventDefault();
      navigate("/login");
    }


  return (
    <>
        <img src={ElipceSuperior} alt="" className="elipce-superior" />
        <img src={ElipceInferior} alt="" className="elipce-inferior" />
        <img src={Logo} alt="Logo de FelicitArte" />
        <div className="box-form">
          <form ref={form} className="form_reg" >
              <WrapperInput msn={"Nombre completo"} type={"text"} placeholder={""} name={"name"} />
              <WrapperInput msn={"Genero"} type={"text"} placeholder={"masculino / femenino / otro"} name={"gender"} />
              <WrapperInput msn={"Fecha de nacimiento"} type={"date"} placeholder={""} name={"birthdate"} />
              <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
              <WrapperInput msn={"Contraseña"} type={"password"} placeholder={""} name={"password"} />

              <span className="textlink">Si ya tienes una cuenta con nosotros, <NavLink className="link" to="/login">Inicia sesión</NavLink></span>
              <div className="buttons">
                  <button className="btn" onClick={handlerClickReg} >Aceptar</button>
                  <button className="btn" onClick={handleCancel} >Cancelar</button>
              </div>
          </form>
        </div>
    </>
  );
}

export default FormRegister;
