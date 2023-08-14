import styled from "styled-components";
import Swal from "sweetalert2";
import { getAllBirthdayBoys, updateBirthdayBoy, deleteBirthdayBoy } from "../../api/birthdayBoy";
import IconEdit from "../../assets/img/icon-edit.png";
import IconDelete from "../../assets/img/icon-delete.png";
import { useEffect, useState } from "react";
import { format } from "date-fns"; 

const StyledTable = styled.table`
  width: 80%;
  margin: 5% 0;
  border-radius: 5px;
  font-size: 1.1rem;
  background: white;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  thead tr th {
    padding: 1.4rem 1.5rem;
    text-align: left;
    margin-bottom: 3rem;
  }
  tbody tr td {
    padding: 0 1.5rem;
    color: gray;
  }
  .buttons {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
  }
  button {
    width: 45px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
  }
`;

function TableBirthday() {
  const [birthdayList, setBirthdayList] = useState([]); // State to store the birthday list
  const [loading, setLoading] = useState(true);
    async function fetchBirthdayBoys() {
      try {
        const response = await getAllBirthdayBoys();
        setBirthdayList(response.data); // Update the state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching birthday boys:", error);
        setLoading(false);
      }
    }
  useEffect(() => {
    fetchBirthdayBoys();
  }, []);

  const handleEditBirthdayBoy = async (id) => {
    const birthdayPerson = birthdayList.find((person) => person.id === id);
  
    const { value: formValues } = await Swal.fire({
      title: "Editar Cumpleañero",
      html: `
        <input type="text" id="swal-input1" class="swal2-input" value="${birthdayPerson?.fullName || ''}" placeholder="Nombre completo">
        <input type="date" id="swal-input2" class="swal2-input" value="${birthdayPerson?.birthDate?.split("T")[0] || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: async () => {
        const newFullName = document.getElementById("swal-input1").value;
        const newBirthDate = document.getElementById("swal-input2").value;
  
        if (!newFullName) {
          Swal.showValidationMessage("Por favor, ingresa un nombre válido");
          return; // Agregar un return aquí para evitar que continúe la lógica en caso de error
        }
  
        try {
          await updateBirthdayBoy(id, { fullName: newFullName, birthDate: newBirthDate });
          fetchBirthdayBoys();
          Swal.fire("¡Guardado!", "Los datos se han actualizado exitosamente.", "success");
        } catch (error) {
          Swal.fire("Error", "Ha ocurrido un error al guardar los datos.", "error");
        }
      },
    });
  };

  const handleDeleteBirthdayBoy = async (id) => {
    const shouldDelete = await Swal.fire({
      title: "Confirmar eliminación",
      text: "¿Estás seguro de que deseas eliminar este cumpleañero?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (shouldDelete.isConfirmed) {
      try {
        await deleteBirthdayBoy(id);
        fetchBirthdayBoys();
        Swal.fire("¡Eliminado!", "El cumpleañero ha sido eliminado exitosamente.", "success");
      } catch (error) {
        Swal.fire("Error", "Ha ocurrido un error al eliminar el cumpleañero.", "error");
      }
    }
  };
  
  return (
    <div className="box-birthdays">
      {loading ? (
        <p>Cargando...</p>
      ) : birthdayList.length === 0 ? (
        <p>Al parecer no has registrado ningún cumpleañero.</p>
      ) :(
      <StyledTable>
        <thead className="thead">
          <tr>
            <th>Nombre del cumpleañero</th>
            <th>Fecha de cumpleaños</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {birthdayList.map((birthdayPerson, index) => (
            <tr key={index}>
              <td>{birthdayPerson.fullName}</td>
              <td> {format(new Date(birthdayPerson.birthDate.split("T")[0].split("-")), "dd - MM - yyyy")}</td>
              <td className="buttons">
                <button onClick={() => handleEditBirthdayBoy(birthdayPerson.id)}>
                  <img src={IconEdit} alt="Icono de editar" />
                </button>
                <button onClick={() => handleDeleteBirthdayBoy(birthdayPerson.id)}>
                  <img src={IconDelete} alt="Icono de borrar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      )}
    </div>
  );
}

export default TableBirthday;
