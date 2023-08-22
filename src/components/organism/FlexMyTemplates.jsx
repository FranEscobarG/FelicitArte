import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { getNextBirthdayBoys } from "../../api/birthdayBoy";
import { getAllCard, deleteCard } from "../../api/card";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonCard from "../atoms/ButtonCard";
import "../../assets/styles/flexTemplates.css";

function FlexMyTemplates() {
  const navigate = useNavigate();
  const [nextbirthdayList, setNextBirthdayList] = useState([]);
  const [cardList, setCardList] = useState([]);
  
  async function fetchNextBirthdayBoys() {
    try {
      const response = await getNextBirthdayBoys();
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
    return cardList.map((card) => <ButtonCard key={card.id} text={card.name} preview={`http://localhost:4000/${card.preview}`} handleDeleteCard={() => handleDeleteCard(card.id)} />);
  };

  return (
    <div className="home-container">
      <VerticalMenu fetchNextBirthdayBoys={fetchNextBirthdayBoys} nextbirthdayList={nextbirthdayList} updateList={handleUpdate} />
      <div className="flex-templates">
        <div className="plantillas">{mapeo()}</div>
        <Toaster />
      </div>
    </div>
  );
}

export default FlexMyTemplates;
