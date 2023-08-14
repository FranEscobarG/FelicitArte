import styled from "styled-components";

const StyledDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-weight: 700;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
  background-color: #8a8484;
  border-radius: 8px;
}
`;
const StyledButton = styled.button`
  width: 100%;
  height: 75%;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

function ButtonTool({ img, handle, text }) {
  return (
    <StyledDiv>
      <StyledButton onClick={handle}>
        <img src={img} alt="" />
      </StyledButton>
      <label htmlFor="">{text}</label>
    </StyledDiv>
  );
}

export default ButtonTool;
