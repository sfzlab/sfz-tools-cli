import { Command } from 'commander';
import { convertSfzToJson, convertSfzToXml, fileText } from '@sfz-tools/core';

const convert = new Command('convert')
  .arguments('<filepath>')
  .option('-j, --json', 'Output as json')
  .option('-x, --xml', 'Output as xml')
  .description('Convert sfz files to other formats')
  .action(async (filepath: string, options: { json?: boolean; xml?: boolean }) => {
    const sfzDir: string = filepath.substring(0, filepath.lastIndexOf('/'));
    const sfzText: string = fileText(filepath);
    if (options.json) console.log(JSON.stringify(await convertSfzToJson(sfzText, sfzDir), null, 2));
    else console.log(await convertSfzToXml(sfzText, sfzDir));
  });

export { convert };
