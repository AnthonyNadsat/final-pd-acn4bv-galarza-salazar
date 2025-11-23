import express from "express";
import {
    getBugs,
    createBug,
    updateBug,
    deleteBug
} from "../controllers/bugsController.js";

const router = express.Router();

router.get("/", getBugs);
router.post("/", createBug);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

export default router;