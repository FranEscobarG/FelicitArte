import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import WrapperInput from "../molecules/WrapperInput";
import ElipceSuperior from "../../assets/img/EllipseReg1.svg"
import ElipceInferior from "../../assets/img/EllipseReg2.svg"
import Logo from "../../assets/img/logo.png"
import '../../assets/styles/formRegister.css'
import styled from "styled-components"
import Swal from 'sweetalert2'
import { createUser } from "../../api/user";
const StyledDiv = styled.div`
    margin-bottom: 2.2rem;
`;

function FormRegister() {

  const navigate = useNavigate();

    const form = useRef()
    // const endpoint = 'http://localhost:4000/api/signup';  // 44.207.54.43

    const handlerClickReg = async(e)=>{
        e.preventDefault();
        const regForm = new FormData(form.current);
        let user = {
          fullName: regForm.get('name'),
          gender: regForm.get('gender'),
          birthDate: regForm.get('birthdate'),
          email: regForm.get('email'),
          password: regForm.get('password')
        }
        try{
          const response = await createUser(user);
          console.log(response);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/login");
        }catch(error){
          console.log(error.response.data.message);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.response.data.message,
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
        <img src={ElipceSuperior} alt="" className="elipce-superior" />
        <img src={ElipceInferior} alt="" className="elipce-inferior" />
        <img src={Logo} alt="Logo de FelicitArte" />
        <div className="box-form">
          <form ref={form} className="form_reg" >
              <WrapperInput msn={"Nombre completo"} type={"text"} placeholder={""} name={"name"} />
              <StyledDiv>
              <label htmlFor="">Genero</label>
              <select name="gender" className="selectOptions">
                <option value="">Selecciona una opción</option>
                <option value="masculino">Masculino</option>
               <option value="femenino">Femenino</option>
               <option value="otro">Otro</option>
              </select>
              </StyledDiv>
             {/*  <WrapperInput msn={"Genero"} type={"list"} placeholder={""} name={"gender"} /> */}
              <WrapperInput msn={"Fecha de nacimiento"} type={"date"} placeholder={""} name={"birthdate"} />
              <WrapperInput msn={"Correo"} type={"e-mail"} placeholder={""} name={"email"} />
              <WrapperInput msn={"Contraseña"} type={"password"} placeholder={""} name={"password"} />

              <span className="textlink">Si ya tienes una cuenta con nosotros, <NavLink className="link" to="/login">Inicia sesión</NavLink></span>
              <div className="buttons">
                  <button className="btn" onClick={handleCancel} >Cancelar</button>
                  <button className="btn" onClick={handlerClickReg} >Aceptar</button>
              </div>
          </form>
        </div>
    </>
  );
}

export default FormRegister;
