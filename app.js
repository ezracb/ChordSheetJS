import ChordSheetJS from 'chordsheetjs';
import http from 'http';
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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
const port = 80;
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  

app.listen(port);
console.log('Server started at http://localhost:' + port);
// app.get('/chord', (req, res) => {
//     res.send(regtochordpro(),{chordpro:regtochordpro()})
// });
// app.listen(port, () => {
//     console.log(`cli-nodejs-api listening at http://localhost:${port}`)
// });


function regtochordpro(){
    const chordSheet = `
        Am         C/G        F          C
    Let it be, let it be, let it be, let it be
    C                G              F  C/E Dm C
    Whisper words of wisdom, let it be`.substring(1);

    const parser = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false });
    const song = parser.parse(chordSheet);


    const formatter = new ChordSheetJS.ChordProFormatter();
    const disp = formatter.format(song);

    return disp;
}

