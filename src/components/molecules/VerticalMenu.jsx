import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { differenceInDays, parseISO, startOfDay } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { createBirthdayBoy } from "../../api/birthdayBoy";
import IconFolder from "../../assets/img/Folder.svg";
import IconArows from "../../assets/img/DoubleRight.svg";
import IconBirthday from "../../assets/img/Birthday.svg";
import Timer from "../../assets/img/TimeWhite.svg";

const StyledDiv = styled.div`
  min-height: 90vh;
  width: 20%;
  color: white;
  background-color: #4d6584;

  h3 {
    margin-top: 5%;
    padding: 1rem 0.8rem;
  }
  .birthday_boys {
    min-height: 15vh;
    font-size: 1.2rem;
    padding: 0 5%;
    font-weight: 500;
  }
  .item-birthdayboy {
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
  }
  .item-birthdayboy .nameB{
    width: 50%;
    display: flex;
    align-items: center;
    /* background-color: blue; */
  }
  .item-birthdayboy .days{
    width: 45%;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .item-birthdayboy .days img{
    width: 27%;
  }

  .menu-option {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 2.2rem;
    gap: 10px;
    cursor: pointer;
  }
  button {
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
    transition: all 0.4s ease-in-out;
  }
  button:hover {
    background-color: #304867;
  }
`;

function VerticalMenu({ fetchNextBirthdayBoys, nextbirthdayList, updateList}) {
  const navigate = useNavigate();

  const handleRecentlyModified = () => {
    navigate("/home");
  };
  const handleMyTemplates = () => {
    navigate("/templates");
  };

  const handleAddBirthdayBoy = () => {
    Swal.fire({
      title: "Agregar Cumpleañero",
      html:
        `<label for="swal-input1" class="label-styled">Nombre completo</label> <br>` +
        `<input id="swal-input1" class="swal2-input border-box-input" placeholder="Nombre completo">` +
        `<br><br><label for="swal-input2" class="label-styled">Fecha de nacimiento</label>` +
        `<br><input type="date" id="swal-input2" class="swal2-input border-box-input">`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#E83E3E",
      confirmButtonText: "Enviar",
      confirmButtonColor: "#5138EE",
      preConfirm: async () => {
        if (
          !document.getElementById("swal-input1").value ||
          !document.getElementById("swal-input2").value
        ) {
          Swal.showValidationMessage("Por favor, rellena ambos campos");
          console.log("Error datos incompletos");
        } else {
          let birthdayBoy = {
            fullName: document.getElementById("swal-input1").value,
            birthDate: document.getElementById("swal-input2").value,
          };
          try {
            const response = await createBirthdayBoy(birthdayBoy);
            console.log(response);
            fetchNextBirthdayBoys();
            updateList();
            toast.success("Guardado exitosamente");
          } catch (error) {
            toast.error("UPSS algo salio mal");
          }
        }
      },
      customClass: {
        input: "border-box-input",
      },
    });
  };

  const handleShowBirthday = () => {
    navigate("/birthdays");
  };

  return (
    <StyledDiv>
      <div>
        <h3>Proximos cumpleañeros:</h3>
        <ul className="birthday_boys">
          {nextbirthdayList.slice(0, 3).map((birthdayPerson) => {
            // Convierte la fecha de cumpleaños a objeto de fecha
            const birthDate = parseISO(birthdayPerson.birthDate);
            const currentYear = new Date().getFullYear();
            // Crea una fecha de cumpleaños para el año actual
            const currentYearBirthday = new Date( currentYear, birthDate.getMonth(), birthDate.getDate());
            // Calcula la diferencia en días
            const currentDate = startOfDay(new Date());
            let daysDifference = differenceInDays(
              currentYearBirthday,
              currentDate
            );
            // Verifica si la fecha de cumpleaños es hoy
            const isBirthdayToday = daysDifference === 0;
            if (daysDifference <= 0) {
              // Si la fecha de cumpleaños de este año ya pasó, ajusta para el próximo año
              const nextYearBirthday = new Date(
                currentYear + 1,
                birthDate.getMonth(),
                birthDate.getDate()
              );
              daysDifference = differenceInDays(nextYearBirthday, currentDate);
            }

            return (
              <li className="item-birthdayboy" key={birthdayPerson.id}>
                <div className="nameB">{birthdayPerson.fullName}</div>
                <div className="days">
                  <img src={Timer} alt="" />{" "}
                  {isBirthdayToday ? "hoy" : daysDifference + " días"}
                </div>
              </li>
            );
          })}

        </ul>
      </div>
      <br />
      <br />

      <div className="menu-option" onClick={handleRecentlyModified}>
        <img src={IconArows} alt="Icono de flecha" />
        <img src={IconFolder} alt="Icono de folder" />
        Modificados recientemente
      </div>
      <div className="menu-option" onClick={handleMyTemplates}>
        <img src={IconArows} alt="Icono de flecha" />
        <img src={IconFolder} alt="Icono de folder" />
        Mis plantillas
      </div>
      <div className="menu-option" onClick={handleAddBirthdayBoy}>
        <img src={IconArows} alt="Icono de flecha" />
        <img src={IconFolder} alt="Icono de folder" />
        Agregar Cumpleañeros
      </div>
      <button onClick={handleShowBirthday}>
        <img src={IconBirthday} alt="" />
        Ver todos los cumpleaños
      </button>
    </StyledDiv>
  );
}

export default VerticalMenu;
