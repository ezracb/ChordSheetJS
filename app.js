import ChordSheetJS from 'chordsheetjs';


const chordSheet = `
       Am         C/G        F          C
Let it be, let it be, let it be, let it be
C                G              F  C/E Dm C
Whisper words of wisdom, let it be`.substring(1);

const parser = new ChordSheetJS.ChordSheetParser();
const song = parser.parse(chordSheet);


const formatter = new ChordSheetJS.ChordProFormatter({ preserveWhitespace: false });
const disp = formatter.format(song);