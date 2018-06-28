const translate = require('google-translate-api');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let enTitle, enCat, enTag;

rl.question("Application title: ", (ti) => {
    enTitle = ti;
    rl.question("Application category: ", (cat) => {
        enCat = cat;

        rl.question("Application tag: ", (tag) => {
            enTag = tag;
            rl.close();
            let enObj = {
                enTitle,
                enCat,
                enTag
            };

            translate(enTitle, {to: 'es'}).then(res => {
                
            })

        });
    })
});




translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});
