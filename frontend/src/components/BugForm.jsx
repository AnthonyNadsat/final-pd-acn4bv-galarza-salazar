import { useState } from 'react';

const initialState = {
    nombreJuego: '',
    plataforma: '',
    tipo: '',
    gravedad: 'BAJA',
    descripcion: '',
};

export default function BugForm({ onBugCreated, loading }) {
    const [formData, setFormData] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (
            !formData.nombreJuego ||
            !formData.plataforma ||
            !formData.tipo ||
            !formData.gravedad ||
            !formData.descripcion
        ) {
            setErrorMsg('Por favor llená todos los campos');
            return;
        }

        if (formData.descripcion.length > 500) {
            setErrorMsg('La descripción no puede superar los 500 caracteres');
            return;
        }

        await onBugCreated(formData);
        setFormData(initialState);
    };

    return (
        <form onSubmit={handleSubmit} className="bug-form">
            <h2>Reportar nuevo bug</h2>

            {errorMsg && <p className="error">{errorMsg}</p>}

            <div>
                <label>Juego</label>
                <input
                    name="nombreJuego"
                    value={formData.nombreJuego}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Plataforma</label>
                <select
                    name="plataforma"
                    value={formData.plataforma}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar...</option>
                    <option value="PC">PC</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox Series">Xbox Series</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                </select>
            </div>

            <div>
                <label>Tipo</label>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar...</option>
                    <option value="Gráfico">Gráfico</option>
                    <option value="Audio">Audio</option>
                    <option value="Gameplay">Gameplay</option>
                </select>
            </div>

            <div>
                <label>Gravedad</label>
                <select
                    name="gravedad"
                    value={formData.gravedad}
                    onChange={handleChange}
                >
                    <option value="BAJA">Baja</option>
                    <option value="MEDIA">Media</option>
                    <option value="ALTA">Alta</option>
                </select>
            </div>

            <div>
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    maxLength={500}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Reportar bug'}
            </button>
        </form>
    );
}