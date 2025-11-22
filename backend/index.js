const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 3000;

// Middleware de configuración global
app.use(cors());
app.use(express.json());
app.use(logger);

// Ruta del archivo JSON
const bugsFilePath = path.join(__dirname, 'data', 'bugs.json');

// Helper para el archivo JSON
function leerBugs() {
    if (!fs.existsSync(bugsFilePath)) {
        fs.writeFileSync(bugsFilePath, '[]', 'utf-8');
    }
    const data = fs.readFileSync(bugsFilePath, 'utf-8');
    return JSON.parse(data);
}

function guardarBugs(bugs) {
    fs.writeFileSync(bugsFilePath, JSON.stringify(bugs, null, 2), 'utf-8');
}

// Middleware de validar
function validarBug(req, res, next) {
    const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

    if (!nombreJuego || !plataforma || !tipo || !gravedad || !descripcion) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    if (descripcion.length > 500) {
        return res.status(400).json({ message: 'La descripción no puede superar los 500 caracteres' });
    }

    next();
}

// GET /api/bugs
app.get('/api/bugs', (req, res) => {
    const bugs = leerBugs();
    res.json(bugs);
});

// POST /api/bugs
app.post('/api/bugs', validarBug, (req, res) => {
    const bugs = leerBugs();

    const nuevoBug = {
        id: Date.now(),
        nombreJuego: req.body.nombreJuego,
        plataforma: req.body.plataforma,
        tipo: req.body.tipo,
        gravedad: req.body.gravedad,
        descripcion: req.body.descripcion,
        fecha: new Date().toLocaleString('es-AR')
    };

    bugs.push(nuevoBug);
    guardarBugs(bugs);

    res.status(201).json({
        message: 'Bug creado correctamente',
        data: nuevoBug
    });
});

// Inicializar servidor express
app.listen(PORT, () => {
    console.log(`Servidor Express inicializado en http://localhost:${PORT}`);
});
