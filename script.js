const fs = require('fs');
const parse = require('./parser.js').parse;
const treeToHTML = require('./parseTreeToHTML.js');

// output files
const htmlOutput = 'out/out.html';
const parseTreeOutput = 'out/parsed.json';


fs.promises.readFile(process.argv[2], 'utf-8').then(parse).then(s=>{
    fs.writeFileSync(htmlOutput, treeToHTML(s));
    fs.writeFileSync(parseTreeOutput, JSON.stringify(s));
});