import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import WorkArea from "../pages/WorkArea";
import RecoverPassword from "../pages/RecoverPassword";
import BirthdayBoys from "../pages/BirthdayBoys";
import Projects from "../pages/Projects";
import UserContext from "../context/UserContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // estado en true para pruebas
  const [isLoged, setIsLoged] = useState(true); // cambuar a false para su funcionamiento
  const [userName, setUserName] = useState("");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLoged, setIsLoged, userName, setUserName }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recovery" element={<RecoverPassword />} />

          <Route element={<ProtectedRoute session={isLoged} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/birthdays" element={<BirthdayBoys />} />
            <Route path="/lienzo/:projectName" element={<WorkArea />} />
            <Route path="/projects/:projectName" element={<Projects />} />
          </Route>

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
