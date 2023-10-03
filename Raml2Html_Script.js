const path = require("path");
const fs = require("fs");
const raml2html = require("/usr/local/lib/node_modules/raml2html");

const configWithDefaultTheme = raml2html.getConfigForTheme();

const ramlFile = path.join(__dirname, process.env.FILENAME_RAML);

raml2html.render(ramlFile, configWithDefaultTheme).then(
  console.log(ramlFile);
  (result) => {
    fs.appendFile(process.env.FILENAME_HTML, result, function (err) {
      if (err) {
        console.log("Error al generar archivo HTML");
      } else {
        console.log("Se creo archivo HTML con exito");
      }
    });
  },
  (error) => {
    console.log(error);
    fs.appendFile(process.env.FILENAME_ERROR, error, function (err) {
      if (err) {
        console.log("Error al generar archivo TXT");
      } else {
        console.log("Se creo archivo TXT con exito");
      }
    });
  }
);
