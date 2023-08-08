import styled from 'styled-components';
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const StyledDiv = styled.div`
    margin-bottom: 2.2rem;
`;

function WrapperInput({ msn, type, placeholder, name }) {
    return (
        <StyledDiv>
            <Label msn={msn} />
            <Input type={type} placeholder={placeholder} pname={name} />
        </StyledDiv>
    );
}

export default WrapperInput;