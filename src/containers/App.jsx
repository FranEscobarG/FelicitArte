import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import WorkArea from "../pages/WorkArea";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lienzo" element={<WorkArea />} />

            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
