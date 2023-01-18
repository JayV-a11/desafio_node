import config from "../config/db.js";
import consultaEndereco from "../utils/consultaEndereco.js";
import gerarPDF from "../utils/gerarPDF.js";
import gerarXLSX from "../utils/gerarXLSX.js";
import moment from "moment/moment.js";
import { ObjectId } from "mongodb";

class DespesasController {
  static salvarDespesa = async (req, res) => {
    try {
      const {
        valor,
        data_compra,
        descricao,
        tipo_pagamento_id,
        categoria_id,
        cep,
        num_end,
      } = req.body;

      if (
        !valor ||
        !data_compra ||
        !descricao ||
        !tipo_pagamento_id ||
        !categoria_id ||
        !cep ||
        !num_end
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Dados incompletos" });
      }

      const endereco = await consultaEndereco(cep, num_end);

      if (endereco.success) {
        const result = await config.db.collection("despesas").insertOne({
          valor: valor,
          data_compra: new Date(data_compra),
          descricao: descricao,
          tipo_pagamento_id: ObjectId(tipo_pagamento_id),
          categoria_id: ObjectId(categoria_id),
          end_id: ObjectId(endereco.data.toHexString()),
        });

        if (result.acknowledged) {
          res
            .status(201)
            .json({ success: true, message: `_id: ${result.insertedId}` });
        } else {
          res
            .status(500)
            .json({ success: false, message: "Falha ao inserir despesa" });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static buscarDespesas = async (req, res) => {
    try {
      let formatType = req.query.formatType;
      let dataMinima = new Date(
        formatType == "xlsx"
          ? moment().startOf("month").format("YYYY-MM-DD")
          : req.query.dataMinima
      );
      let dataMaxima = new Date(
        formatType == "xlsx"
          ? moment().endOf("month").format("YYYY-MM-DD")
          : req.query.dataMaxima
      );

      const despesas = await config.db
        .collection("despesas")
        .aggregate([
          {
            $match: {
              data_compra: {
                $gte: dataMinima,
                $lte: dataMaxima,
              },
            },
          },
          {
            $lookup: {
              from: "enderecos",
              localField: "end_id",
              foreignField: "_id",
              as: "endereco",
            },
          },
          {
            $lookup: {
              from: "tipos_pagamentos",
              localField: "tipo_pagamento_id",
              foreignField: "_id",
              as: "tipo_pagamento",
            },
          },
          {
            $lookup: {
              from: "categorias",
              localField: "categoria_id",
              foreignField: "_id",
              as: "categoria",
            },
          },
        ])
        .toArray();

      if (formatType == "xlsx") {
        gerarXLSX(despesas, res);
      } else if (formatType == "pdf") {
        gerarPDF(despesas, res);
      } else res.json({ sucess: true, message: despesas });
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static deletarDespesa = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res
          .status(404)
          .json({ success: null, message: "Despesa não encontrada" });
      const result = await config.db
        .collection("despesas")
        .deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res
          .status(200)
          .json({ success: true, message: "Despesa excluída com sucesso" });
      } else {
        res
          .status(404)
          .json({ succes: null, message: "Despesa não encontrada" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static atualizarDespesa = async (req, res) => {
    try {
      const { valor, data_compra, descricao } = req.body;
      const updateObject = {};

      if (valor) updateObject.valor = valor;
      if (data_compra) updateObject.data_compra = data_compra;
      if (descricao) updateObject.descricao = descricao;

      const result = await config.db
        .collection("despesas")
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: updateObject });

      if (result.modifiedCount === 1) {
        res.json({ success: true, message: "Despesa atualizada com sucesso" });
      } else {
        res
          .status(404)
          .json({ success: null, message: "Despesa não encontrada" });
      }
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message:
            "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
        });
    }
  };
}

export default DespesasController;
