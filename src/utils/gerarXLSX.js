import exceljs from "exceljs";

const gerarXLSX = (despesas, res) => {
  const workbook = new exceljs.Workbook();
  const sheet = workbook.addWorksheet("Primeira Aba");

  sheet.columns = [
    { header: "data da compra", key: "data_compra" },
    { header: "descricao", key: "descricao" },
    { header: "valor", key: "valor" },
    { header: "forma de pagamento", key: "fomaPagmento" },
    { header: "categoria", key: "categoria" },
    { header: "endereço", key: "endereco" },
  ];

  despesas?.map((despesa) =>
    sheet.addRow({
      data_compra: despesa.data_compra.toISOString().slice(0, 10),
      descricao: despesa.descricao,
      valor: despesa.valor,
      fomaPagmento: despesa.tipo_pagamento[0].tipo,
      categoria: despesa.categoria[0].nome,
      endereco: `Rua ${despesa.endereco[0].logradouro} Nº
      ${despesa.endereco[0].numero}, ${despesa.endereco[0].cidade} -
      ${despesa.endereco[0].estado} `,
    })
  );
  sheet.getRow(1).font = {
    bold: true,
  };

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=despesas.xlsx");
  sheet.workbook.xlsx.write(res);
};

export default gerarXLSX;
