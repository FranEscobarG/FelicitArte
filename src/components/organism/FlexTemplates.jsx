import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getNextBirthdayBoys } from "../../api/birthdayBoy";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonTemplate from "../atoms/ButtonTemplate";
import IconPlus from "../../assets/img/iconPlus.svg";
import ButtonCard from "../atoms/ButtonCard";
import "../../assets/styles/flexTemplates.css";
import { getAllCard } from "../../api/card";
import globos from "../../assets/img/globos.jpg"

function FlexTemplates() {
  const navigate = useNavigate();
  const [nextbirthdayList, setNextBirthdayList] = useState([]);
  const [cardList, setCardList] = useState([]);

  async function fetchNextBirthdayBoys() {
    try {
      const response = await getNextBirthdayBoys();
      console.log("Imprimiendo los cumpleañeros");
      console.log(response.data);
      let birthdayboys = response.data;
      let birthdayMessage;
      const currentDate = new Date();

      const birthdayToday = birthdayboys.filter((birthdayboy) => {
        const birthDate = new Date(birthdayboy.birthDate);
        return birthDate.getMonth() === currentDate.getMonth() && birthDate.getDate() === currentDate.getDate();
      });

      if (birthdayToday.length > 0) {
        birthdayMessage = `Hoy es cumpleaños de ${birthdayToday.map((birthdayboy) => birthdayboy.fullName).join(', ')}`;
        Swal.fire({
          title: birthdayMessage,
          text: 'Felicítalo en este día tan especial',
          imageUrl: globos,
          imageWidth: 200, // Ancho de la imagen en píxeles
          imageHeight: 200, // Alto de la imagen en píxeles
        });
      } else {
        birthdayMessage = 'Nadie cumple años hoy';
        console.log(birthdayMessage);
      }

      setNextBirthdayList(response.data);
    } catch (error) {
      console.error("Error fetching birthday boys:", error);
    }
  }

  async function getCardList() {
    try{
      const response = await getAllCard();
      console.log("Imprimiendo tarjetas");
      console.log(response.data);
      setCardList(response.data);
    }catch(error){
      console.error("Error fetching cards:", error);
    }
  }

  useEffect(() => {
    getCardList();
    fetchNextBirthdayBoys();
  }, []);

  const handleOpenLienzo = async () => {
    const { value: name } = await Swal.fire({
      title: "Ingrese el nombre del proyecto",
      input: "text",
      inputLabel: "Nombre del proyecto",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Por favor, ingrese el nombre del proyecto";
        }
      },
    });
    if (name) {
      if(cardList.length == 0) {
        navigate("/lienzo/" + name);
      }else{
        const existProject = cardList.some(project => project.name === name);
        if(existProject) {
          Swal.fire({
            title: "Este proyecto ya existe",
            icon: "error",
          });
          navigate("/home");
        }else{
          navigate("/lienzo/" + name);
        }
      }
    }
  };

  const handleAddTemplate = () => {
    Swal.fire({
      title: "Crear plantilla",
      html:
        `<label for="swal-input1" class="label-styled">Nombre del proyecto</label> <br>` +
        `<input id="swal-input1" class="swal2-input border-box-input" placeholder="Nombre">` +
        `<br><br><label for="swal-input2" class="label-styled">Selecciona una imagen</label>` +
        `<br><input type="file" id="swal-input2" class="swal2-input border-box-input">`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#E83E3E",
      confirmButtonText: "Enviar",
      confirmButtonColor: "#5138EE",
      preConfirm:  () => {
        if (
          !document.getElementById("swal-input1").value ||
          !document.getElementById("swal-input2").value
        ) {
          Swal.showValidationMessage("Por favor, rellena ambos campos");
          console.log("Error datos incompletos");
        } else {
          let claves = Object.keys(localStorage);
          if(claves.includes(document.getElementById("swal-input1").value)){
            Swal.fire({
              title: "Este proyecto ya existe",
              icon: "error",
            });
          }else{
            alert("Aca ira la logica de agregar plantilla");
            try {
              console.log(document.getElementById("swal-input1").value);
              console.log(document.getElementById("swal-input2").value)
              alert("todo bien")
            } catch (error) {
              alert("error")
            }
          }
        }
      }
    });
  }
  const handleUpdate = () => {
    console.log("Lista actualizada")
  };

  const mapeo = () => {
    let claves = Object.keys(localStorage);
    return cardList.slice(0, 6).map((card) => <ButtonCard key={card.id} text={card.name} />);
  };

  return (
    <div className="home-container">
      <VerticalMenu fetchNextBirthdayBoys={fetchNextBirthdayBoys} nextbirthdayList={nextbirthdayList} updateList={handleUpdate} />
      <div className="flex-templates">
        <div className="buttons-templates">
          <ButtonTemplate
            img={IconPlus}
            handle={handleOpenLienzo}
            text={"Lienzo en blanco"}
          />
          <ButtonTemplate
            img={IconPlus}
            handle={handleAddTemplate}
            text={"Agregar plantilla"}
          />
        </div>
      <div className="plantillas">{mapeo()}</div>

        <Toaster />
      </div>
    </div>
  );
}

export default FlexTemplates;
