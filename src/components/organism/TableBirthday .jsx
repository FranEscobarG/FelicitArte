import styled from "styled-components";
import { getAllBirthdayBoys, updateBirthdayBoy, deleteBirthdayBoy } from "../../api/birthdayBoy";
import IconEdit from "../../assets/img/icon-edit.png";
import IconDelete from "../../assets/img/icon-delete.png";
import { useEffect, useState } from "react";

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

    async function fetchBirthdayBoys() {
      try {
        const response = await getAllBirthdayBoys();
        setBirthdayList(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching birthday boys:", error);
      }
    }
  useEffect(() => {
    fetchBirthdayBoys();
  }, []);

  const handleEditBirthdayBoy = async (id) => {
    // Implementar la lógica para abrir un formulario de edición
    // y luego llamar a updateBirthdayBoy con los datos actualizados.
    console.log("Editando cumpleañero con ID:", id);
  };

  const handleDeleteBirthdayBoy = async (id) => {
    // Implementar la lógica para confirmar la eliminación
    const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar este cumpleañero?");
    if (shouldDelete) {
      try {
        await deleteBirthdayBoy(id);
        fetchBirthdayBoys();
        console.log("Cumpleañero eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el cumpleañero:", error);
      }
    }
  };

  return (
    <div className="box-birthdays">
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
              <td>{birthdayPerson.birthDate.split("T")[0]}</td>
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
    </div>
  );
}

export default TableBirthday;
