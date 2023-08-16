import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getNextBirthdayBoys } from "../../api/birthdayBoy";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonCard from "../atoms/ButtonCard";
import "../../assets/styles/flexTemplates.css";

function FlexMyTemplates() {
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

  const handleUpdate = () => {
    console.log("Lista actualizada")
  };

  const mapeo = () => {
    let claves = Object.keys(localStorage);
    return claves.map((nombre) => <ButtonCard key={nombre} text={nombre} />);
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
