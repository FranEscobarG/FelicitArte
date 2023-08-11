import styled from "styled-components";

const StyledDiv = styled.div`
  width: 17%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  label{
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

function ButtonTemplate({ img, handle, text }) {
  return (
    <StyledDiv>
      <StyledButton onClick={handle}>
        <img src={img} alt="Icon plus" />
      </StyledButton>
      <label htmlFor="">{text}</label>
    </StyledDiv>
  );
}

export default ButtonTemplate;
