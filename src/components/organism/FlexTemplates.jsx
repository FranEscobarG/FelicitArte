import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonTemplate from "../atoms/ButtonTemplate";
import IconPlus from "../../assets/img/iconPlus.svg";
import AnimalTemplate from "../../assets/img/Animal-Folder.svg";
import '../../assets/styles/flexTemplates.css'

function FlexTemplates() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
  
    const handleOpenModal = () => {
      Swal.fire({
        title: "Agregar cumpleañero",
        inputLabel: "Nombre completo",
        html:
          '<label for="swal-input1" style="margin-bottom: 10px">Nombre completo</label> <br>' +
          `<input id="swal-input1" class="swal2-input" placeholder="Nombre completo" value="${fullName}"> <br>` +
          '<label for="swal-input2" style="margin-bottom: 10px">Fecha de nacimiento</label>' + 
          '<br><input type="date" id="swal-input2" class="swal2-input">',
        showCancelButton: true,
        preConfirm: () => {
          setFullName(document.getElementById("swal-input1").value);
          setBirthDate(document.getElementById("swal-input2").value);
        },
      })
    };

    const handleOpenLienzo = () => {
        navigate("/lienzo")
    };
  
    const handleAddTemplate = () => {
        alert("PARA AGREGAR PLANTILLAS")
    };

    return ( 
        <div className="home-container">
            <VerticalMenu/>
            <div className="flex-templates">
            <ButtonTemplate img={IconPlus} handle={handleOpenLienzo} text={"Lienzo en blanco"}/>
            <ButtonTemplate img={IconPlus} handle={handleOpenModal} text={"Agregar plantilla"}/>
            <ButtonTemplate img={IconPlus} handle={handleOpenModal} text={"Agregar cumpleañero"}/>
            <ButtonTemplate img={AnimalTemplate} handle={handleOpenLienzo} text={"Plantilla 1"}/>
            <ButtonTemplate handle={handleOpenLienzo} text={"estas deberian ser platillas"}/>
            <ButtonTemplate handle={handleOpenLienzo} text={"estas deberian ser platillas"}/>
            <ButtonTemplate handle={handleOpenLienzo} text={"estas deberian ser platillas"}/>
            <ButtonTemplate handle={handleOpenLienzo} text={"estas deberian ser platillas"}/>
            <div>
                <p>Nombre completo: {fullName}</p>
                <p>Fecha de nacimiento: {birthDate}</p>
            </div>
            </div>
        </div>
     );
}

export default FlexTemplates;