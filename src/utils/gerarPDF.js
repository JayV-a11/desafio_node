import ejs from "ejs";
import pdf from "html-pdf";
import * as path from "path";

const gerarPDF = (despesas, res) => {
  const __dirname = path.resolve(path.dirname(""));
  const filePath = path.join(
    __dirname,
    "./",
    "src",
    "/",
    "templates",
    "despesas.ejs"
  );

  ejs.renderFile(filePath, { despesas }, (err, data) => {
    if (err) {
      res.status(500).send("Erro na leitura do arquivo");
    } else {
      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      };

      pdf.create(data, options).toBuffer((err, buffer) => {
        if (err) {
          res.status(500).send("Erro ao gerar o pdf");
        } else {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=despesas.pdf"
          );
          res.send(buffer);
        }
      });
    }
  });
};

export default gerarPDF;
