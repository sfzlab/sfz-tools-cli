import { Command } from 'commander';
import { convertSfzToJson, convertSfzToXml, fileText } from '@sfz-tools/core';

const program = new Command();
const convert = program.command('convert').description('Convert files between different formats');

convert
  .command('convert <filepath>')
  .option('-j, --json', 'Output as json')
  .option('-x, --xml', 'Output as xml')
  .description('Convert file to json/xml')
  .action(async (filepath: string, options: { json?: boolean; xml?: boolean }) => {
    const sfzDir: string = filepath.substring(0, filepath.lastIndexOf('/'));
    const sfzText: string = fileText(filepath);
    if (options.json) console.log(await convertSfzToJson(sfzText, sfzDir));
    else console.log(await convertSfzToXml(sfzText, sfzDir));
  });

export { convert };
