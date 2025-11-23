import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
    getBugs,
    createBug,
    updateBug,
    deleteBug
} from "../controllers/bugsController.js";


const router = express.Router();

router.get("/", getBugs);
router.post("/", createBug);

// ADMIN
router.put("/:id", authAdmin, updateBug);
router.delete("/:id", authAdmin, deleteBug);

export default router;
