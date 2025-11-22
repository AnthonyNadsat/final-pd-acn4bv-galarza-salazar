import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">BugLog</Link>
            </div>

            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/reportes">Reportes</Link>

                {!user && <Link to="/login">Login</Link>}

                {user?.role === "admin" && (
                    <Link to="/admin">Admin</Link>
                )}

                {user && (
                    <button className="logout-btn" onClick={logout}>
                        Cerrar sesión
                    </button>
                )}
            </nav>
        </header>
    );
}