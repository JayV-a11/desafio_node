import { ObjectId } from "mongodb";
import config from "../config/db.js";

class CategoriasController {
  static salvarCategoria = async (req, res) => {
    try {
      const { nome, descricao } = req.body;

      if (!nome || !descricao) {
        return res
          .status(400)
          .json({ success: false, data: "Dados incompletos" });
      }

      const result = await config.db
        .collection("categorias")
        .insertOne({ nome: nome, descricao: descricao });

      if (result.acknowledged) {
        res
          .status(201)
          .json({ success: true, data: `_id: ${result.insertedId}` });
      } else {
        res
          .status(500)
          .json({ success: false, data: "Falha ao inserir categoria" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static buscarCategorias = async (req, res) => {
    try {
      const categorias = await config.db
        .collection("categorias")
        .find({})
        .toArray();

      res.json({ success: true, data: categorias });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static deletarCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res
          .status(404)
          .json({ success: null, data: "Categoria não encontrada" });
      const result = await config.db
        .collection("categorias")
        .deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res
          .status(200)
          .json({ success: true, data: "Categoria excluída com sucesso" });
      } else {
        res
          .status(404)
          .json({ success: null, data: "Categoria não encontrada" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };

  static atualizarCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res
          .status(404)
          .json({ succes: null, data: "Categoria não encontrada" });

      const updateResult = await config.db
        .collection("categorias")
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { nome: req.body.nome, descricao: req.body.descricao } }
        );
      if (updateResult.matchedCount === 1) {
        res
          .status(200)
          .json({ success: true, data: "Categoria atualizada com sucesso" });
      } else {
        res
          .status(404)
          .json({ success: null, data: "Categoria não encontrada" });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "Ocorreu um erro interno. Por favor, tente novamente mais tarde",
      });
    }
  };
}

export default CategoriasController;
