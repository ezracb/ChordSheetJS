import ChordSheetJS from "chordsheetjs";
import http from "http";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// fs.readFile('./index.html', function (err, html) {
//        if (err) {
//            throw err;
//        }
//        http.createServer(function(request, response) {
//            response.writeHeader(200, {"Content-Type": "text/html"});
//            response.write(html);
//            response.end();
//        }).listen(8000);
//    });

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/chord", (req, res) => {
  const originalChord = req.body.chord;
  const chordProChord = regtochordpro(originalChord);
  res.json({chord: chordProChord});
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
// app.get('/chord', (req, res) => {
//     res.send(regtochordpro(),{chordpro:regtochordpro()})
// });
// app.listen(port, () => {
//     console.log(`cli-nodejs-api listening at http://localhost:${port}`)
// });

function regtochordpro(originalChord) {
  const chordSheet = originalChord;

  const parser = new ChordSheetJS.ChordSheetParser({
    preserveWhitespace: false,
  });
  const song = parser.parse(chordSheet);

  const formatter = new ChordSheetJS.ChordProFormatter();
  const disp = formatter.format(song);

  console.log("inside function" + disp);
  return disp;
}
