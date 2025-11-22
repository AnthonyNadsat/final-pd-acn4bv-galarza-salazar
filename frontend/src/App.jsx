import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}