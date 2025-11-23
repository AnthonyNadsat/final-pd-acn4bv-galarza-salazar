import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import RequireAdmin from "./components/RequireAdmin";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";


import { deleteBug } from "./services/api";

export default function App() {
    const [bugs, setBugs] = useState([]); // si no lo usás mucho, igual lo dejamos

    const handleDeleteBug = async (id) => {
        try {
            await deleteBug(id);
            setBugs((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error("Error al eliminar bug:", err);
        }
    };

    return (
        <AuthProvider>
            <div className="app-root">
                <BrowserRouter>
                    <Header />

                    <div className="app-layout">
                        <Routes>
                            {/* Login SIEMPRE accesible */}
                            <Route path="/login" element={<Login />} />

                            {/* Rutas que requieren estar logueado */}
                            <Route
                                path="/"
                                element={
                                    <RequireAuth>
                                        <Home />
                                    </RequireAuth>
                                }
                            />

                            <Route
                                path="/reportes"
                                element={
                                    <RequireAuth>
                                        <Reportes onDelete={handleDeleteBug} />
                                    </RequireAuth>
                                }
                            />

                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}
