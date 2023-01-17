import express from "express";
import TiposPagamentosController from "../controllers/TiposPagamentoController.js";

const router = express.Router();

router
  .get("/", TiposPagamentosController.buscarTiposPagamentos)
  .get("/:id", TiposPagamentosController.buscarTiposPagamentosPorId);

export default router;
