import styled from 'styled-components';

const StyledLabel = styled.label`
    font-size: 1rem;
    padding-bottom: 5px;
`;


function Label( {msn} ) {
    return ( 
        <StyledLabel>{msn}</StyledLabel>
     );
}

export default Label;