import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import buglogo from "../assets/buglog.png";   // ← IMPORTAR IMAGEN

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">

                {/* LOGO SOLO */}
                <div className="navbar-brand">
                    <img src={buglogo} alt="BugLog" className="navbar-logo" />
                </div>

                <nav className="navbar-links">
                    {user && (
                        <>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    `nav-link ${isActive ? "nav-link-active" : ""}`
                                }
                            >
                                Reportar bug
                            </NavLink>

                            <NavLink
                                to="/reportes"
                                className={({isActive}) =>
                                    `nav-link ${isActive ? "nav-link-active" : ""}`
                                }
                            >
                                Historial
                            </NavLink>
                        </>
                    )}

                    {!user && (
                        <NavLink
                            to="/login"
                            className={({isActive}) =>
                                `nav-link ${isActive ? "nav-link-active" : ""}`
                            }
                        >
                            Login
                        </NavLink>
                    )}

                    {user && (
                        <button className="nav-auth-btn" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
