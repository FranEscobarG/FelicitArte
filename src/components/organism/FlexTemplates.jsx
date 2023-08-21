import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getNextBirthdayBoys } from "../../api/birthdayBoy";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonTemplate from "../atoms/ButtonTemplate";
import IconPlus from "../../assets/img/iconPlus.svg";
import ButtonCard from "../atoms/ButtonCard";
import "../../assets/styles/flexTemplates.css";
import { getAllCard, createCard, deleteCard } from "../../api/card";
import globos from "../../assets/img/globos.jpg"

function FlexTemplates() {
  const navigate = useNavigate();
  const [nextbirthdayList, setNextBirthdayList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const endpoint = "http://localhost:4000/api/upload";

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
        // Verificar si la alerta ya se mostró antes en esta sesión
        if (!localStorage.getItem('secondAlertShown')) {
          // Mostrar la alerta
          Swal.fire({
            title: birthdayMessage,
            text: 'Felicítalo en este día tan especial',
            imageUrl: globos,
            imageWidth: 200,
            imageHeight: 200,
          });

          // Marcar que la alerta ya se mostró
          localStorage.setItem('secondAlertShown', 'true');
        }
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
      preConfirm: async () => {
        if ( !document.getElementById("swal-input1").value || !document.getElementById("swal-input2").value) {
          Swal.showValidationMessage("Por favor, rellena ambos campos");
          console.log("Error datos incompletos");
        } else {
          const imageFile = document.getElementById("swal-input2").files[0]; // Obtén la imagen seleccionada
          const name = document.getElementById("swal-input1").value.trim();

          if (imageFile) {
            const existProject = cardList.some(
              (project) => project.name === name
            );
            if (existProject) {
              Swal.fire({
                title: "Este proyecto ya existe",
                icon: "error",
              });
            } else {
              try {
                const fileName = imageFile.name;
                const newFileName = `${name}-BG-${fileName}`;

                const modifiedFild = new File([imageFile], newFileName, { type: imageFile.type });
                let formData = new FormData();  
                formData.append("image", modifiedFild); 
                axios({
                  method: "POST",
                  url: endpoint,
                  data: formData,
                  headers: { "Content-Type": "multipart/form-data" },
                })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (response) {
                    console.log(response);
                  });
                const card = {
                  name: name,
                  images: "[]",
                  canvas_data: "[]", 
                  background: newFileName,
                };

                console.log(card);

               const response = await createCard(card);
             
                navigate(`/projects/${name}`);
              } catch (error) {
                Swal.fire({
                  title: "Error al crear la plantilla",
                  icon: "error",
                });
              }
            }
          }
        }
      },
    });
  };

  const handleUpdate = () => {
    console.log("Lista actualizada")
  };


  const handleDeleteCard = async (id) => {
    const shouldDelete = await Swal.fire({
      title: "Confirmar eliminación",
      text: "¿Estás seguro de que deseas eliminar esta plantilla?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (shouldDelete.isConfirmed) {
      try {
        await deleteCard(id);
        getCardList();
        Swal.fire(
          "¡Eliminado!",
          "La plantilla ha sido eliminada exitosamente.",
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error",
          "Ha ocurrido un error al eliminar la plantilla.",
          "error"
        );
      }
    }
  };

  const mapeo = () => {
    let claves = Object.keys(localStorage);
    return cardList.slice(0, 6).map((card) => <ButtonCard key={card.id} text={card.name} preview={card.preview} handleDeleteCard={() => handleDeleteCard(card.id)} />);
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
