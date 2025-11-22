export default function BugCard({ bug }) {
    return (
        <div className="bug-card">
            <div className={`badge badge-${bug.gravedad.toLowerCase()}`}>
                PRIORIDAD {bug.gravedad.toUpperCase()}
            </div>

            <div className="bug-title">
                {bug.nombreJuego} • {bug.plataforma} • {bug.tipo}
            </div>

            <div className="bug-description">{bug.descripcion}</div>
            <div className="bug-date">{bug.fecha}</div>
        </div>
    );
}