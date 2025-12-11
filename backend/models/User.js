import db from "../database.js";

class User {
    // Crear un nuevo usuario
    static create({ username, email, password, role = 'tester' }) {
        const createdAt = new Date().toISOString();

        const query = db.prepare(`
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);

        try {
            const result = query.run(username, email, password, role, createdAt);
            return {
                id: result.lastInsertRowid,
                username,
                email,
                role,
                createdAt
            };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed: users.username')) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            if (error.message.includes('UNIQUE constraint failed: users.email')) {
                throw new Error('El email ya está registrado');
            }
            throw error;
        }
    }

    // Buscar usuario por username
    static findByUsername(username) {
        const query = db.prepare("SELECT * FROM users WHERE username = ?");
        return query.get(username);
    }

    // Buscar usuario por email
    static findByEmail(email) {
        const query = db.prepare("SELECT * FROM users WHERE email = ?");
        return query.get(email);
    }

    // Buscar usuario por ID
    static findById(id) {
        const query = db.prepare("SELECT id, username, email, role, createdAt FROM users WHERE id = ?");
        return query.get(id);
    }

    // Obtener todos los usuarios
    static getAll() {
        const query = db.prepare("SELECT id, username, email, role, createdAt FROM users ORDER BY id");
        return query.all();
    }

    // Verificar si un usuario existe
    static exists(username) {
        const query = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
        const result = query.get(username);
        return result.count > 0;
    }
}

export default User;