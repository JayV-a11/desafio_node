import axios from "axios";
import EnderecosController from "../controllers/enderecosController.js";

const consultaEndereco = async (cep, num_end) => {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (!data.erro) {
      const endereco = {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        numero: num_end,
      };

      return EnderecosController.salvarEndereco(endereco);
    } else {
      console.log({ message: "CEP inválido" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default consultaEndereco;
