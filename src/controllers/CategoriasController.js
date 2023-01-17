import config from "../config/db.js";

class CategoriasController {
  static salvarCategoria = async (req, res) => {
    try {
      const { nome, descricao } = req.body;

      if (!nome || !descricao) {
        return res.status(400).json({ message: "Dados incompletos" });
      }

      await config.db
        .collection("categorias")
        .insertOne({ nome: nome, descricao: descricao })
        .then(() =>
          res.json({
            success: true,
            message: { nome: nome, descricao: descricao },
          })
        );
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };

  static buscarCategorias = async (req, res) => {
    try {
      const categorias = await config.db
        .collection("categorias")
        .find({})
        .toArray();

      res.json(categorias);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Ocorreu um erro interno inesperado. Por favor, tente novamente",
      });
    }
  };

  static deletarCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res.status(404).json({ message: "Categoria não encontrada" });
      const result = await config.db
        .collection("categorias")
        .deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Categoria excluída com sucesso" });
      } else {
        res.status(404).json({ message: "Categoria não encontrada" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  static atualizarCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res.status(404).json({ message: "Categoria não encontrada" });

      const updateResult = await config.db
        .collection("categorias")
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { nome: req.body.nome, descricao: req.body.descricao } }
        );
      if (updateResult.matchedCount === 1) {
        res.status(200).json({ message: "Categoria atualizada com sucesso" });
      } else {
        res.status(404).json({ message: "Categoria não encontrada" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };
}

export default CategoriasController;
