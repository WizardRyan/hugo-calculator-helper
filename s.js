const readline = require('readline');
const os = require('os');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let calc3 = fs.readFileSync('./scripts/calc3.txt');
let calc4 = fs.readFileSync('./scripts/calc4.txt');
let calc = fs.readFileSync('./scripts/calc.txt');
let round = fs.readFileSync('./scripts/round.txt');
let fName = fs.readFileSync('current-file-name.txt');
let fPath = `../calc.guru/layouts/shortcodes/${fName}.html`;

rl.question('Enter calc func num: ', (n) => {

    write('<script>');
    write(os.EOL);

    switch(parseInt(n)){
        case 0:
            write(calc);
            break;
        case 3:
            write(calc3);
            break;
        case 4:
            write(calc4);
            break;
        default:
            write(calc);
            break;
    }
    write(os.EOL);
    write(round);
    write(os.EOL);
    write('</script>');
    rl.close();
});

function write(data){
    fs.appendFileSync(fPath, data);
}