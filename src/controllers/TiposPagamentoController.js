import config from "../config/db.js";

class TiposPagamentosController {
  static buscarTiposPagamentos = async (req, res) => {
    try {
      const tipos_pagamentos = await config.db
        .collection("tipos_pagamentos")
        .find({})
        .toArray();
      res.json(tipos_pagamentos);
    } catch (err) {
      res.status(500).json({
        error: "Ocorreu um erro interno inesperado. Por favor, tente novamente",
      });
    }
  };

  static buscarTiposPagamentosPorId = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res
          .status(404)
          .json({ message: "Tipo de pagamento não encontrado" });
      const tipo_pagamento = await config.db
        .collection("tipos_pagamentos")
        .findOne({ _id: ObjectId(id) });
      if (tipo_pagamento) {
        res.json(tipo_pagamento);
      } else {
        res.status(404).json({ message: "Tipo de pagamento não encontrado" });
      }
    } catch (err) {
      res.status(500).json({
        error: "Ocorreu um erro interno inesperado. Por favor, tente novamente",
      });
    }
  };
}

export default TiposPagamentosController;
