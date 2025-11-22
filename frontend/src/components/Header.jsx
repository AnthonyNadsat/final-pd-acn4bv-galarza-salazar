import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">BugLog</Link>
            </div>

            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/reportes">Reportes</Link>
                <Link to="/login">Login</Link>
                <Link to="/admin">Admin</Link>
            </nav>
        </header>
    );
}
