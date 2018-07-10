const translate = require('google-translate-api');
const readline = require('readline');
const fs = require('fs');
const pretty = require('pretty');
const format = require('html-format');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const topDir = fs.readFileSync('current-top-dir.txt');
const subDir = fs.readFileSync('current-sub-dir.txt');
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
            text = text.replace(/ondata \(/g, "ondata(");
            text = text.replace(/\(diese\)/g, "(this)");
            text = text.replace(/\(esto/g, "(this");
            text = text.replace(/\(isso/g, "(this");
            text = text.replace(/ \(this/g, "(this");
            text = text.replace(/nom\=/g, "name=");
            text = text.replace(/\"bouton\"/g, '"button"');
            text = text.replace(/\"désactivé\"/g, '"disabled"');
            text = text.replace(/\nome da seleção/g, "select name");
            text = text.replace(/\"methematik\"/g, '"mathsymbol"');
            text = text.replace(/breite:/g, "width:");
            text = text.replace(/Breite:/g, 'width:');
            text = text.replace(/Wert\=/g, 'value=');
            text = text.replace(/: # /g, ": #")
            text = text.replace(/largeur:/g, "width:");
            text = text.replace(/remplissage-gauche:/g, "padding-left:");
            text = text.replace(/couleur-arrière-plan:/g, 'background-color');
            text = text.replace(/valeur\=/g, "value=");
            text = text.replace(/\"Nummer\"/g, '"number"');
            text = text.replace(/\"Mathsymbol\"/g, '"mathsymbol"');
            text = text.replace(/preenchimento-esquerdo:/g, 'padding-left:');
            text = text.replace(/largura:/g, 'width:');
            text = text.replace(/cor de fundo:/g, 'background-color:');
            text = text.replace(/\"somente leitura\"/g, "readonly");
            text = text.replace(/tipo de entrada\=/g, "input name=");
            text = text.replace(/nome da seleção/g, 'select name');
            text = text.replace(/ID\=/g, "id=");
            text = text.replace(/\"Okt\"/g, '"oct"');
            text = text.replace(/\"Dez\"/g, "dec");
            text = text.replace(/\"botão\"/g, '"button"');
            text = text.replace(/tipo\=/g, "type=");
            text = text.replace(/\"Summe\"/g, '"sum"');
            text = text.replace(/platzhalter\=/g, 'placeholder=');
            text = text.replace(/zeilen\=/g, "zeilen=");
            text = text.replace(/spalten\=/g, 'cols=');
            text = text.replace(/\"suma\"/g, '"sum"');
            text = text.replace(/lignes\=/g, 'rows=');
            text = text.replace(/\"somme\"/g, '"somme"');
            text = text.replace(/linhas\=/g, "rows=");
            text = text.replace(/\"suma\"/g, '"suma"');
            text = text.replace(/convertir\(\)/g, "convert()");
            text = text.replace(/converter\(\)/g, "convert()");
            text = text.replace(/valor da opção\=/g, "option value=");
            text = text.replace(/\"texte\"/g, "text");
            text = text.replace(/\saisie semi-automatique\=/g, "autocomplete=");
            text = text.replace(/selecionado\=/g, "selected=");
            text = text.replace(/seleccionado\=/g, "selected=");
            text = text.replace(/copier\(\)/g, "copy()");
            text = text.replace(/valor de la opción\=/g, "option value=");
            text = text.replace(/valor de opción\=/g, "option value=");
            text = text.replace(/Zeilen\=/g, "rows=");
            text = text.replace(/valor\=/g, "value=");
            text = text.replace(/inputtyp/g, "input type");
            text = text.replace(/\"Senden\"/g, '"submit"');
            text = text.replace(/\"Bereich\"/g, '"area"');
            text = text.replace(/\"aire\"/g, '"area"');
            text = text.replace(/\"outtexte\"/g, '"outtext"');
            text = text.replace(/\"área\"/g, '"area"');
            text = text.replace(/classe\=/g, "class=");
            text = text.replace(/Leinwand/g, "canvas");
            text = text.replace(/-id/g, " id");
            text = text.replace(/\"Winkel\"/g, '"angle"');
            text = text.replace(/\"numéro\"/g, '"number"');
            text = text.replace(/id de table/g, "table id");
            text = text.replace(/id=\"zone\"/g, 'id="area"');
            text = text.replace(/eingabe \(/g, "input(");
            text = text.replace(/entrada \(/g, "input(");
            text = text.replace(/entrée \(/g, "input(");
            text = text.replace(/für\=/g, "for=");
            text = text.replace(/\"okt\"/g, '"oct"');
            text = text.replace(/\<Tabellen/g, "<table");
            text = text.replace(/: nenhum/g, ": none");
            text = text.replace(/\"formato\"/g, '"format"');
            text = text.replace(/\"dec\"/g, '"dec"');
            text = text.replace(/\"convertir/g, '"convert');
            text = text.replace(/\"typ\"/g, '"type"');
            text = text.replace(/\"tipo\"/g, '"type"');
            text = text.replace(/is\=/g, "id=");
            text = text.replace(/\<bouton/g, "<button");
            rep(/1/g, "2");
            //text = text.replace(/)
            text = format(text);
            console.log(`Writing ${fName}.${langs[lIndex]}.md...`)
            fs.appendFileSync(`../calc.guru/content/${topDir}/${subDir}/${fName}.${langs[lIndex]}.md`, text, 'utf8');
            lIndex++;
            trans();
        }).catch(err => console.log(err));        
    }
}

function rep(exp, repl){
    text = text.replace(exp, repl);
}




