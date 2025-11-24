import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Crear carpeta data si no existe
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Path al archivo .db
const dbPath = path.join(dataDir, "bugs.db");

// Inicializar conexión
const db = new Database(dbPath);

// Crear tabla si no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS bugs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreJuego TEXT NOT NULL,
        plataforma TEXT NOT NULL,
        tipo TEXT NOT NULL,
        gravedad TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        fecha TEXT NOT NULL
    )
`);

export default db;
