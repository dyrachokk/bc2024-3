const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

try {

  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));


  const results = data.map(entry => ({
    ...entry, 
    AttractionSummary: `${entry.StockCode}-${entry.ValCode}-${entry.Attraction}` 
  }));

 
  if (options.display) {
    console.log(JSON.stringify(results, null, 2));
  }


  if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(results, null, 2), 'utf8');

  }

} catch (error) {

  if (error.code === 'ENOENT') {
    console.error('Файл для читання не знайдено.');
  } else if (error instanceof SyntaxError) {
    console.error('Помилка парсингу JSON.');
  } else {
    console.error('Сталася несподівана помилка:', error.message);
  }
}
