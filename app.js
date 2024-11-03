const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

// Перевірка наявності обов'язкового файлу
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Зчитування файлу
const data = fs.readFileSync(options.input, 'utf8');

// Виведення або запис даних
if (options.output) {
  fs.writeFileSync(options.output, data, 'utf8');
}
if (options.display) {
  console.log(data);
}

// Якщо не задано -o або -d, програма нічого не виводить
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }