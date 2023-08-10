import styled from "styled-components"
import IconFolder from "../../assets/img/Folder.svg";
import IconArows from "../../assets/img/DoubleRight.svg";
import IconBirthday from "../../assets/img/Birthday.svg";

const StyledDiv = styled.div`
    min-height: 90vh;
    width: 15%;
    color: white;
    background-color: #4D6584;

    h3{
        padding: 1rem .8rem;
    }
    .birthday_boys{
        min-height: 15vh;
        font-size: 1.2rem;
        text-align: center;
    }
    li{
        margin: .5rem 0;
    }

    .menu-option{
        display: flex;
        align-items: center;
        font-weight: 600;
        margin-bottom: 2.4rem;
        gap: 10px;
    }
    button{
        width: 80%;
        margin: 3rem auto;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        font-size: 1rem;
        border-radius: 10px;
        background-color: #314053;
        border: none;
        color: white;
        cursor: pointer;
        transition: all .4s ease-in-out;
    }
    button:hover{
        background-color: #304867;
    }
`;

function VerticalMenu() {
    return ( 
        <StyledDiv>
            <div>
                <h3>Hoy es el cumpleaños de:</h3>
                <ul className="birthday_boys">
                    <li>Francisco</li>
                    <li>Jorge Alexis</li>
                </ul>
            </div>

            <div className="menu-option">
                <img src={IconArows} alt="Icono de flecha" />
                <img src={IconFolder} alt="Icono de folder" />Modificados recientemente
            </div>
            <div className="menu-option">
                <img src={IconArows} alt="Icono de flecha" />
                <img src={IconFolder} alt="Icono de folder" />Mis plantillas
            </div>
            <button><img src={IconBirthday} alt="" />Ver todos los cumpleaños</button>
        </StyledDiv>
     );
}

export default VerticalMenu;