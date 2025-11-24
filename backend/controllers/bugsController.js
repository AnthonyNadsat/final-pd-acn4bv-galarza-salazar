import db from "../database.js";

// GET
export const getBugs = (req, res) => {
    const rows = db.prepare("SELECT * FROM bugs ORDER BY id DESC").all();
    res.json(rows);
};

// POST
export const createBug = (req, res) => {
    const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

    if (!nombreJuego || !plataforma || !tipo || !gravedad || !descripcion) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const fecha = new Date().toLocaleString("es-AR");

    const query = db.prepare(`
        INSERT INTO bugs (nombreJuego, plataforma, tipo, gravedad, descripcion, fecha)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = query.run(
        nombreJuego,
        plataforma,
        tipo,
        gravedad,
        descripcion,
        fecha
    );

    const newBug = {
        id: result.lastInsertRowid,
        nombreJuego,
        plataforma,
        tipo,
        gravedad,
        descripcion,
        fecha
    };

    res.status(201).json({ message: "Bug creado", data: newBug });
};

// PUT
export const updateBug = (req, res) => {
    const { id } = req.params;
    const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

    const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

    if (!existing) {
        return res.status(404).json({ message: "Bug no encontrado" });
    }

    db.prepare(`
        UPDATE bugs
        SET nombreJuego=?, plataforma=?, tipo=?, gravedad=?, descripcion=?
        WHERE id=?
    `).run(nombreJuego, plataforma, tipo, gravedad, descripcion, id);

    const updated = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

    res.json({ message: "Bug actualizado", data: updated });
};

// DELETE
export const deleteBug = (req, res) => {
    const { id } = req.params;

    const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

    if (!existing) {
        return res.status(404).json({ message: "Bug no encontrado" });
    }

    db.prepare("DELETE FROM bugs WHERE id = ?").run(id);

    res.json({ message: "Bug eliminado correctamente" });
};
