import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <BrowserRouter>
            <Header />

            <div className="app-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/reportes" element={<Reportes />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
