import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VerticalMenu from "../molecules/VerticalMenu";
import ButtonTemplate from "../atoms/ButtonTemplate";
import IconPlus from "../../assets/img/iconPlus.svg";
import AnimalTemplate from "../../assets/img/Animal-Folder.svg";
import '../../assets/styles/flexTemplates.css'
import { createBirthdayBoy } from "../../api/birthdayBoy";
import toast, { Toaster } from 'react-hot-toast';

function FlexTemplates() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
  
    const handleOpenModal = () => {
      Swal.fire({
        title: "Agregar Cumpleañero",
        html:
            `<label for="swal-input1" class="label-styled">Nombre completo</label> <br>` +
            `<input id="swal-input1" class="swal2-input border-box-input" placeholder="Nombre completo">` +
            `<br><br><label for="swal-input2" class="label-styled">Fecha de nacimiento</label>` + 
            `<br><input type="date" id="swal-input2" class="swal2-input border-box-input">`,
            showCancelButton: true,
            confirmButtonText: "Enviar",
            preConfirm: async() => {
              if(!document.getElementById("swal-input1").value || !document.getElementById("swal-input2").value){
                Swal.showValidationMessage("Por favor, rellena ambos campos");
              }else{
                setFullName(document.getElementById("swal-input1").value);
                setBirthDate(document.getElementById("swal-input2").value);
                let birthdayBoy = {
                  fullName: fullName,
                  birthDate: birthDate
                }
                
                try{
                  const response = await createBirthdayBoy(birthdayBoy);
                  console.log(response);
                  toast.success('Guardado exitosamente')
                }catch(error){
                  toast.error("UPSS algo salio mal")
                }
              }
            },
            customClass: {
                input: "border-box-input",
              },
      })
    }
     
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
            <Toaster />
            </div>
        </div>
     );
}

export default FlexTemplates;