import config from "../config/db.js";

class EnderecosController {
  static salvarEndereco = async (endereco) => {
    const result = await config.db.collection("enderecos").insertOne(endereco);
    console.log({
      success: true,
      message: "Endereço salvo com sucesso",
    });

    const response = {
      data: result.insertedId,
      success: result.acknowledged,
    };

    return response;
  };
}

export default EnderecosController;
