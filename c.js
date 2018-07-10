const translate = require('google-translate-api');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const langs = ["es", "pt", "fr", "de", "en"];

//set content path here
const topDir = "converters";
const subDir = "voltage";

//leave as "" if you want the program to query you for either of these
const category = "converter";
const tag = subDir;

fs.writeFileSync('current-top-dir.txt', topDir);
fs.writeFileSync('current-sub-dir.txt', subDir);

let content = {};
ask(content);

function ask(obj){
     askName(obj);
}

function askName(obj){
    rl.question("Content filename: ", (n) => {
        obj.enName = n;
        fs.writeFileSync('current-file-name.txt', n);
        askTitle(obj);
    })
}

function askTitle(obj){
    rl.question("Content title: ", (t) => {
        obj.enTitle = t;
        if(!checkCategory(obj)){
            askCategory(obj);
        }
        else if(checkTag(obj) && checkCategory(obj)){
            doneAsking(obj);
        }
    })
}

function askCategory(obj){
    rl.question("Content category: ", (c) => {
        obj.enCategory = c;

        if(!checkTag(obj)){
            askTag(obj);
        }
        else{
            doneAsking(obj);
        }
    })
}

function askTag(obj){
    rl.question("Content tag: ", (t) => {
        obj.enTag = t;
        doneAsking(obj);
    })
}

function doneAsking(obj){
    rl.close();
    translateContent(obj);
}

function checkTag(obj){
    if(tag !== ""){
        obj.enTag = tag;
        return true;
    }
    return false;
}

function checkCategory(obj){
    if(category !== ""){
        obj.enCategory = category;
        return true;
    }
    return false;
}

function translateContent(obj){
    console.log("Translating...");
    translateRe(0);
}

function translateRe(num){
    transLang(obj, langs[num], translateRe(num++));
}

// function translateES(obj){
//     transLang(obj, "es", translatePT);
// }

// function translatePT(obj){
//     transLang(obj, "pt", translateDE);
// }

// function translateDE(obj){
//     transLang(obj, "de", translateFR);
// }

// function translateFR(obj){
//     transLang(obj, "fr", writeFiles);
// }


function transLang(obj, lang, callback){
    trans(obj, "Title", lang, () => {
        trans(obj, "Category", lang, () => {
            trans(obj, "Tag", lang, () => {
                callback(obj);
            })
        })
    });
}

function trans(obj, prop, lang, callback){
    translate(obj["en" + prop], {to: lang}).then(res => {
        obj[lang + prop] = res.text;
        callback();
    });
}


function writeFiles(obj){
    console.log('Writing Files...');
    langs.forEach(lang => writeContent(obj, lang));
    fs.writeFileSync(`../calc.guru/layouts/shortcodes/${obj.enName}.html`, '');
    console.log('All Done!');
}

function writeContent(obj, lang){
    fs.writeFileSync(`../calc.guru/content/${topDir}/${subDir}/${obj.enName}.${lang}.md`, frontMatter(obj, lang));
}

function frontMatter(obj, lang){
    let header = 
    `---
title: "${obj[lang + 'Title']}"
categories: ["${obj[lang + 'Category']}"]
tags: ["${obj[lang + 'Tag']}"]
---

{{<${obj.enName}>}}
`
    return header;
}