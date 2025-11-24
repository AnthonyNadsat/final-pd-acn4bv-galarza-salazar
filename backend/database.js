import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "bugs.db");

const db = new Database(dbPath);

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
