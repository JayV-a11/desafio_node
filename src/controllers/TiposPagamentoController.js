import { ObjectId } from "mongodb";
import config from "../config/db.js";

class TiposPagamentosController {
  static buscarTiposPagamentos = async (req, res) => {
    try {
      const tipos_pagamentos = await config.db
        .collection("tipos_pagamentos")
        .find({})
        .toArray();
      res.json({
        success: true,
        data: tipos_pagamentos,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static buscarTiposPagamentosPorId = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res
          .status(404)
          .json({ success: null, data: "Tipo de pagamento não encontrado" });
      const tipo_pagamento = await config.db
        .collection("tipos_pagamentos")
        .findOne({ _id: ObjectId(id) });
      if (tipo_pagamento) {
        res.json({ success: true, data: tipo_pagamento });
      } else {
        res
          .status(404)
          .json({ success: false, data: "Tipo de pagamento não encontrado" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };
}

export default TiposPagamentosController;
