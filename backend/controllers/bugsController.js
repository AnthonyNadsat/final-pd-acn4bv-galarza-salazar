import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path correcto al JSON
const dataPath = path.join(__dirname, "..", "data", "bugs.json");

// Helpers
const leerBugs = () => {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "[]", "utf-8");
    }
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
};

const guardarBugs = (bugs) => {
    fs.writeFileSync(dataPath, JSON.stringify(bugs, null, 2), "utf-8");
};

// GET
export const getBugs = (req, res) => {
    const bugs = leerBugs();
    res.json(bugs);
};

// POST
export const createBug = (req, res) => {
    const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

    if (!nombreJuego || !plataforma || !tipo || !gravedad || !descripcion)
        return res.status(400).json({ message: "Faltan campos obligatorios" });

    const bugs = leerBugs();

    const nuevoBug = {
        id: Date.now(),
        nombreJuego,
        plataforma,
        tipo,
        gravedad,
        descripcion,
        fecha: new Date().toLocaleString("es-AR"),
    };

    bugs.push(nuevoBug);
    guardarBugs(bugs);

    res.status(201).json({ message: "Bug creado", data: nuevoBug });
};

// PUT
export const updateBug = (req, res) => {
    const { id } = req.params;
    const bugs = leerBugs();

    const index = bugs.findIndex((bug) => bug.id == id);
    if (index === -1)
        return res.status(404).json({ message: "Bug no encontrado" });

    bugs[index] = { ...bugs[index], ...req.body };
    guardarBugs(bugs);

    res.json({ message: "Bug actualizado", data: bugs[index] });
};

// DELETE
export const deleteBug = (req, res) => {
    const { id } = req.params;
    const bugs = leerBugs();

    const existe = bugs.some((bug) => bug.id == id);
    if (!existe)
        return res.status(404).json({ message: "Bug no encontrado" });

    const nuevos = bugs.filter((bug) => bug.id != id);
    guardarBugs(nuevos);

    res.json({ message: "Bug eliminado correctamente" });
};
