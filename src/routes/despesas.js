import express from "express";
import DespesasController from "../controllers/DespesasController.js";

const router = express.Router();

router
  .post("/", DespesasController.salvarDespesa)
  .get("/", DespesasController.buscarDespesas)
  .put("/", DespesasController.atualizarDespesa)
  .patch("/", DespesasController.atualizarDespesa)
  .delete("/", DespesasController.deletarDespesa);

export default router;
