import styled from "styled-components"
import Logo from "../../assets/img/logo.png"
import IconUser from "../../assets/img/user.svg";
import { NavLink } from "react-router-dom";

const StyledNavbar = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #7b4ae3;
  color: white;
  padding: 0 1.5rem;

  .logo{
    height: 90px;
    position: absolute;
    left: 2%;
  }
  .user_profile{
    display: flex;
    align-items: center;
    margin-right: 4rem;
    gap: 1rem;
  }
  button{
    padding: 15px 5px;
    color: white;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all .5s ease;
  }
  button:hover{
    background-color: #5a2bbe;
  }
`;

function Navbar({btnBack}) {
  return (
    <StyledNavbar>
      <img src={Logo} alt="Logo de FelicitArte" className="logo" />
      {btnBack ? <NavLink to="/home">Regresar</NavLink> : null}
      
      <div className="user_profile">
        <img src={IconUser} alt="Icono de usuario" />
        <span className="username">Nombre de perfil</span>
      </div>
      <button>Cerrar Sesión</button>
    </StyledNavbar>
  );
}

export default Navbar;
