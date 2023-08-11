import VerticalMenu from "../molecules/VerticalMenu";
import '../../assets/styles/flexTemplates.css'
import React, { useState } from "react";
import Swal from "sweetalert2";

function FlexTemplates() {
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



    return ( 
        <div className="home-container">
            <VerticalMenu/>
            <div className="flex-templates">
            <button onClick={handleOpenModal}>Abrir SweetAlert</button>
                <div>
                    <p>Nombre completo: {fullName}</p>
                    <p>Fecha de nacimiento: {birthDate}</p>
                </div>
            </div>
        </div>
     );
}

export default FlexTemplates;