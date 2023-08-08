import styled from "styled-components"

const StyledInput = styled.input`
    border-radius: 8px;
    background-color: #F1BC8C;
    border: none;
    padding: 10px;
    width: 100%;
    font-size: 1rem; 
`;

//Para que este componente sea reutilizable - No se puede llamar igual que el elemento del styled
function Input({ type, placeholder, pname }) {
    return (
        <StyledInput type={type} placeholder={placeholder} name={pname} required />
    );
}

export default Input;
