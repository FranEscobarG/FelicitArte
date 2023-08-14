import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AnimalFolder from "../../assets/img/Animal-Folder.svg"

const StyledDiv = styled.div`
  width: 20%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

function ButtonCard({ text }) {
  const navigate = useNavigate();

  const handlerClick = (name) => {
    navigate("/projects/" + name);
  };

  return (
    <StyledDiv>
      <StyledButton onClick={() => handlerClick(text)}>
        <img src={AnimalFolder} alt="Icon template" />
      </StyledButton>
      <label htmlFor="">{text}</label>
    </StyledDiv>
  );
}

export default ButtonCard;
