import express from "express";
import DespesasController from "../controllers/DespesasController.js";

const router = express.Router();

router
  .post("/", DespesasController.salvarDespesa)
  .get("/", DespesasController.buscarDespesas)
  .put("/:id", DespesasController.atualizarDespesa)
  .patch("/:id", DespesasController.atualizarDespesa)
  .delete("/:id", DespesasController.deletarDespesa);

export default router;
