import express from "express";
import config from "./src/config/db.js";
import tipos_pagamentos from "./src/routes/tipos_pagamentos.js";
import categorias from "./src/routes/categorias.js";
import despesas from "./src/routes/despesas.js";

const app = express();

config.client
  .connect()
  .then(() => {
    app.use(express.json());
    app.use("/tipos_pagamentos", tipos_pagamentos);
    app.use("/categorias", categorias);
    app.use("/despesas", despesas);
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log("Erro de conexão:", err);
  });
