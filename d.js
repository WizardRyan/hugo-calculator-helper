const translate = require('google-translate-api');
const readline = require('readline');
const fs = require('fs');
const pretty = require('pretty');
const format = require('html-format');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const topDir = 'converters';
const subDir = 'electrical';
const langs = ['es', 'pt', 'fr', 'de'];
let lIndex = 0;
let text;
let fName = fs.readFileSync('current-file-name.txt');

trans();


function trans(){
    if(lIndex === langs.length){
        console.log('Done!');
        rl.close();
        return;
    }
    else {
        text = fs.readFileSync(`../calc.guru/content/${topDir}/${subDir}/${fName}.en.md`, 'utf8');
        text = text.substring(text.indexOf('}}') + 2);
        console.log("Translating...");
        translate(pretty(text), {from: 'en', to: langs[lIndex]}).then(res => {
            text = res.text.replace(/\<\/ /g, '</');
            text = text.replace(/\& /g, '&');
            text = text.replace(/ \= /g, '=');
            text = text.replace(/ \(\)/g, '()');
            text = text.replace(/type\=\"botão\"/g, 'type="button"');
            text = text.replace(/type\=\"nombre\"/g, 'type="number"');
            text = text.replace(/formname\=\"kalkform\"/g, 'form name="calcform"');
            text = text.replace(/Eingabetyp\=\"Nummer\"/g, 'input type="number"');
            text = text.replace(/Name\=/g, 'name=');
            text = text.replace(/Klasse\=/g, 'class=');
            text = text.replace(/Eingabetyp\=\"Text\"/g, 'input type="text"');
            text = text.replace(/Autofokus/g, "autofocus");
            text = text.replace(/wert\=/g, "value=");
            text = text.replace(/nome\=/g, "name=");
            text = text.replace(/Intext/g, "intext");
            text = text.replace(/Min\=/g, "min=");
            text = text.replace(/Anzeige: keine/g, "display: none");
            text = text.replace(/deaktiviert\=/g, "disabled");
            text = text.replace(/\=\"nummer\"/g, '"=number"');
            text = text.replace(/\<seleccionar/g, "<select");
            text = text.replace(/\<opción\>/g, "<option>");
            text = text.replace(/nombre\=/g, "name=");
            text = text.replace(/\"voltio\"/g, "volt");
            text = text.replace(/désactivé\=\"désactivé\"/g, 'disabled="disabled"');
            text = text.replace(/affichage: aucun/g, "display: none");
            text = text.replace(/pas\=/g, "step=");
            text = text.replace(/tipo de entrada\=\"número\"/g, 'input type="number"');
            text = text.replace(/\<opção\>/g, "<option>");
            text = text.replace(/nenhum\"/g, 'none"');
            text = text.replace(/desativado\"/g, 'disabled"');
            text = text.replace(/estilo\=/g, 'style=');
            text = text.replace(/\"fase\"/g, '"phase"');
            text = text.replace(/\<Eingabe/g, "<input");
            text = format(text);
            console.log(`Writing ${fName}.${langs[lIndex]}.md...`)
            fs.appendFileSync(`../calc.guru/content/${topDir}/${subDir}/${fName}.${langs[lIndex]}.md`, text, 'utf8');
            lIndex++;
            trans();
        }).catch(err => console.log(err));        
    }
}





