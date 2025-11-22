import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = login(username, password);

        if (!result.ok) {
            setErrorMsg(result.message);
            return;
        }

        navigate("/");
    };

    return (
        <div>
            <h1>Login</h1>

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}