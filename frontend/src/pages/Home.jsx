import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BugForm from "../components/BugForm";
import { createBug } from "../services/api";
import "../styles/home.css";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const handleCreate = async (bugData) => {
        try {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            await createBug(bugData);

            setSuccessMsg("Bug reportado correctamente");
        } catch (err) {
            setErrorMsg(err.message || "Error al reportar el bug");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccessMsg("");
                setErrorMsg("");
            }, 3000);
        }
    };

    return (
        <main className="page home-page">
            <div className="page-inner">
                <div className="card home-card">

                    <h1 className="page-title">¿En qué juego apareció?</h1>

                    {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    {/* Formulario normal */}
                    <BugForm onBugCreated={handleCreate} loading={loading} />

                    <div className="home-actions">

                        {/* ESTE ES EL ÚNICO BOTÓN QUE ENVÍA EL FORM */}
                        <button
                            type="submit"
                            form="bugForm"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            Reportar bug
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/reportes")}
                        >
                            Ver historial
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
