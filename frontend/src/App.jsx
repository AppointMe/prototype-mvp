import { Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";

function App() {
  return (
    <Routes>
      {/* Rutas SIN layout */}
      <Route path="/" element={<Login />} />

      {/* Rutas CON layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        {/* Aquí puedes agregar más páginas */}
        {/* <Route path="/appointments" element={<Appointments />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
