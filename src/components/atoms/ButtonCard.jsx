import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AnimalFolder from "../../assets/img/Animal-Folder.svg"
import IconDelete from "../../assets/img/icon-delete.png";

const StyledDiv = styled.div`
  width: 24%;
  height: 42vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .5s ease;
  &:hover{
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
  }
  .box-btnDelete{
    width: 100%;
    background-color: #d9d9d9;
    display: flex;
    justify-content: end;
  }
  .btn-deleteCard{
    padding: 5px 5px 0 5px ;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  label {
    font-weight: 700;
  }
`;
const StyledButton = styled.button`
  width: 100%;
  height: 90%;
  margin-bottom: 1rem;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
`;

function ButtonCard({ text, handleDeleteCard }) {
  const navigate = useNavigate();

  const handlerClick = (name) => {
    navigate("/projects/" + name);
  };

  return (
    <StyledDiv>
      <div className="box-btnDelete">
        <button className="btn-deleteCard" onClick={handleDeleteCard}>
          <img src={IconDelete} alt="Icono de borrar" />
        </button>
      </div>
      <StyledButton onClick={() => handlerClick(text)}>
        <img src={AnimalFolder} alt="Icon template" />
      </StyledButton>
      <label htmlFor="">{text}</label>
    </StyledDiv>
  );
}

export default ButtonCard;
