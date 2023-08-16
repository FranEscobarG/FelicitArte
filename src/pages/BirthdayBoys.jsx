import TableBirthday from "../components/organism/TableBirthday ";
import Navbar from "../components/molecules/Navbar";
import "../assets/styles/birthdays.css";

function BirthdayBoys() {
  return (
    <>
      <Navbar btnBack={true} />
        <TableBirthday />
    </>
  );
}

export default BirthdayBoys;
