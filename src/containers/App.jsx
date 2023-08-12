import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import WorkArea from "../pages/WorkArea";
import RecoverPassword from "../pages/RecoverPassword";
import BirthdayBoys from "../pages/BirthdayBoys";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recovery" element={<RecoverPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/birthdays" element={<BirthdayBoys />} />
            <Route path="/lienzo" element={<WorkArea />} />

            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
