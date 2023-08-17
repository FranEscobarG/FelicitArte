import styled from "styled-components"
import { useContext } from "react";
import Swal from 'sweetalert2'
import Logo from "../../assets/img/logo.png"
import IconUser from "../../assets/img/user.svg";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

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
  .btn-back{
    color: white;
    text-decoration: none;
    margin-right: 7%;
    font-size: 1.1rem;
    font-weight: 700;
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
  const {userName, setUserName} = useContext(UserContext);
  const { setIsLoged} = useContext(UserContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Estás seguro que deseas cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina información del usuario del localStorage
        window.localStorage.removeItem("loggedUser");
        // Restablecer el estado del contexto
        setIsLoged(false);
        setUserName("");
      }
    });
  };


  return (
    <StyledNavbar>
      <img src={Logo} alt="Logo de FelicitArte" className="logo" />
      {btnBack ? <NavLink className={"btn-back"} to="/home">Regresar</NavLink> : null}
      
      <div className="user_profile">
        <img src={IconUser} alt="Icono de usuario" />
        <span className="username">{userName}</span>
      </div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </StyledNavbar>
  );
}

export default Navbar;