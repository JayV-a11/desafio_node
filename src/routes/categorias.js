import express from "express";
import CategoriasController from "../controllers/CategoriasController.js";

const router = express.Router();

router
  .post("/", CategoriasController.salvarCategoria)
  .get("/", CategoriasController.buscarCategorias)
  .delete("/:id", CategoriasController.deletarCategoria)
  .put("/:id", CategoriasController.atualizarCategoria);

export default router;
