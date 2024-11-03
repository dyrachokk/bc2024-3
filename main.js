const fs = require('fs');
const { program } = require('commander');

// Налаштування командних аргументів
program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

try {
  // Зчитування JSON-файлу
  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  // Форматування даних
  const results = data.map(entry => {
    const stockCode = entry.StockCode;
    const valCode = entry.ValCode;
    const attraction = entry.Attraction;
    return `${stockCode}-${valCode}-${attraction}`;
  });

  // Якщо задано параметр --display, виводимо результат у консоль
  if (options.display) {
    results.forEach(result => console.log(result));
  }

  // Якщо задано параметр --output, записуємо результат у файл
  if (options.output) {
    fs.writeFileSync(options.output, results.join('\n'), 'utf8');
  }

  // Якщо не задано жодного з параметрів -o або -d, програма нічого не виводить

} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('Cannot find input file');
  } else if (error instanceof SyntaxError) {
    console.error('Error parsing JSON');
  } else {
    console.error('An unexpected error occurred:', error.message);
  }
}
