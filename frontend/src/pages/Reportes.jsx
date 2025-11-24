import { useEffect, useState, useContext } from "react";
import { fetchBugs, deleteBug, updateBug } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import EditModal from "../components/EditModal";
import "../styles/reportes.css";

export default function Reportes() {
    const { user } = useContext(AuthContext);

    const [bugs, setBugs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("TODOS");

    const [modalOpen, setModalOpen] = useState(false);
    const [bugToEdit, setBugToEdit] = useState(null);

    useEffect(() => {
        cargarBugs();
    }, []);

    async function cargarBugs() {
        try {
            const data = await fetchBugs();
            setBugs(data);
            setFiltered(data);
        } catch (err) {
            console.error("Error al cargar:", err);
        } finally {
            setLoading(false);
        }
    }

    function filtrar(tipo) {
        setActiveFilter(tipo);
        if (tipo === "TODOS") return setFiltered(bugs);
        setFiltered(bugs.filter(b => b.gravedad.toUpperCase() === tipo));
    }

    const handleDelete = async (id) => {
        try {
            await deleteBug(id);
            await cargarBugs();
        } catch (err) {
            console.error("Error al eliminar:", err);
        }
    };

    const openEditModal = (bug) => {
        setBugToEdit(bug);
        setModalOpen(true);
    };

    const handleSaveEdit = async (updatedBug) => {
        try {
            await updateBug(updatedBug.id, updatedBug);
            setModalOpen(false);
            setBugToEdit(null);
            await cargarBugs();
        } catch (err) {
            console.error("Error al actualizar:", err);
        }
    };

    return (
        <main className="reportes-wrapper">

            {/* Filtros */}
            <div className="filtros-container">
                {["TODOS", "BAJA", "MEDIA", "ALTA"].map(f => (
                    <button
                        key={f}
                        className={`filtro-btn ${activeFilter === f ? "active" : ""}`}
                        onClick={() => filtrar(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Lista */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="reportes-content">
                    {filtered.length === 0 ? (
                        <div className="empty-state-big">
                            No hay bugs reportados
                        </div>
                    ) : (
                        filtered.map(bug => (
                            <div key={bug.id} className="bug-card-report">
                                <div className={`badge-report badge-${bug.gravedad.toLowerCase()}`}>
                                    PRIORIDAD {bug.gravedad.toUpperCase()}
                                </div>

                                <div className="bug-report-title">
                                    {bug.nombreJuego} • {bug.plataforma} • {bug.tipo}
                                </div>

                                <div className="bug-report-desc">
                                    {bug.descripcion}
                                </div>

                                <div className="bug-report-date">{bug.fecha}</div>

                                {user?.role === "admin" && (
                                    <div className="report-actions">
                                        <button className="btn-delete" onClick={() => handleDelete(bug.id)}>
                                            Eliminar
                                        </button>

                                        <button className="btn-edit" onClick={() => openEditModal(bug)}>
                                            Editar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <EditModal
                    bug={bugToEdit}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}
        </main>
    );
}
