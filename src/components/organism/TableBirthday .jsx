import styled from "styled-components";

const StyledTable = styled.table``;

function TableBirthday() {
  const birthdayList = [
    {
      name: "Francisco",
      birthdate: "21-04-2003",
    },
    {
      name: "Luis Humber",
      birthdate: "03-05-2001",
    },
    {
      name: "Jonny Pozo",
      birthdate: "22-12-2002",
    },
  ];

  // const handleEdit = () => {
  //     alert("PARA EDITAR")
  // };
  // const handleDelete = () => {
  //     alert("PARA ELIMINAR")
  // };

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
              <td>{birthdayPerson.name}</td>
              <td>{birthdayPerson.birthdate}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default TableBirthday;
