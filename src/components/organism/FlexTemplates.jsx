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
  const handleUpdate = () => {
    console.log("Lista actualizada")
  };

  const mapeo = () => {
    let claves = Object.keys(localStorage);
    return claves.slice(0, 6).map((nombre) => <ButtonCard key={nombre} text={nombre} />);
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
