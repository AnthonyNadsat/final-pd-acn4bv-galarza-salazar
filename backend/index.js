import express from "express";
import cors from "cors";
import bugsRouter from "./routes/bugs.js";
import logger from "./middlewares/logger.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/bugs", bugsRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});