const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();


if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}


if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

try {
 
  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  
  const results = data.map(entry => {
    const stockCode = entry.StockCode || 'N/A';  
    const valCode = entry.ValCode || 'N/A';      
    const attraction = entry.Attraction || 0;    
    return `${stockCode}-${valCode}-${attraction}`;
  });

  
  if (options.display) {
    results.forEach(result => console.log(result));
  }

  
  if (options.output) {
    fs.writeFileSync(options.output, results.join('\n'), 'utf8');
  }

} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('Error parsing JSON');
  } else {
    console.error('An unexpected error occurred:', error.message);
  }
}