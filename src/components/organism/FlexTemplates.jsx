import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonTemplate from "../atoms/ButtonTemplate";
import IconPlus from "../../assets/img/iconPlus.svg";
import ButtonCard from "../atoms/ButtonCard";
import { getNextBirthdayBoys, createBirthdayBoy } from "../../api/birthdayBoy";
import "../../assets/styles/flexTemplates.css";

function FlexTemplates() {
  const navigate = useNavigate();
  const [nextbirthdayList, setNextBirthdayList] = useState([]);

  async function fetchNextBirthdayBoys() {
    try {
      const response = await getNextBirthdayBoys();
      setNextBirthdayList(response.data);
    } catch (error) {
      console.error("Error fetching birthday boys:", error);
    }
  }
  useEffect(() => {
    fetchNextBirthdayBoys();
  }, []);

  const handleOpenModal = () => {
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
      let claves = Object.keys(localStorage);
      console.log(claves.length);
      console.log(name);
      console.log(typeof name);
      if (claves.length == 0) {
        navigate("/lienzo/" + name);
      } else {
        for (let i = 0; i < claves.length; i++) {
          const clave = localStorage.key(i);
          console.log("Tengo una clave: ", clave);

          if (clave == name) {
            Swal.fire({
              title: "Este proyecto ya existe",
              icon: "error",
            });
            navigate("/home");
            break;
          } else {
            navigate("/lienzo/" + name);
          }
        }
      }
    }
  };

  const handleAddTemplate = () => {
    alert("PARA AGREGAR PLANTILLAS");
  };

  const mapeo = () => {
    let claves = Object.keys(localStorage);

    return claves.map((nombre) => <ButtonCard key={nombre} text={nombre} />);
  };

  return (
    <div className="home-container">
      <VerticalMenu nextbirthdayList={nextbirthdayList} />
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
          <ButtonTemplate
            img={IconPlus}
            handle={handleOpenModal}
            text={"Agregar cumpleañero"}
          />
        </div>
        {/* <ButtonTemplate
          img={AnimalTemplate}
          handle={handleOpenLienzo}
          text={"Plantilla 1"}
        /> */}
        <div className="plantillas">{mapeo()}</div>

        <Toaster />
      </div>
    </div>
  );
}

export default FlexTemplates;
