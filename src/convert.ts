import { Command } from 'commander';
import {
  convertJsToSfz,
  convertJsToXml,
  convertSfzToJs,
  convertSfzToXml,
  convertXmlToJs,
  convertXmlToSfz,
  fileJson,
  fileText,
  pathGetDirectory,
  pathGetExt,
} from '@sfz-tools/core';
import { ParseDefinition } from '@sfz-tools/core/dist/types/parse';

const convert = new Command('convert')
  .arguments('<filepath>')
  .option('-j, --json', 'Output as json')
  .option('-s, --sfz', 'Output as sfz')
  .option('-x, --xml', 'Output as xml')
  .description('Convert sfz files to other formats')
  .action(async (filepath: string, options: { json?: boolean; sfz?: boolean; xml?: boolean }) => {
    const fileExt: string = pathGetExt(filepath);
    if (fileExt === 'json') {
      const sfzJs: ParseDefinition = fileJson(filepath);
      if (options.sfz) console.log(convertJsToSfz(sfzJs));
      if (options.xml) console.log(convertJsToXml(sfzJs));
    } else if (fileExt === 'sfz') {
      const sfzDir: string = pathGetDirectory(filepath);
      const sfzText: string = fileText(filepath);
      if (options.json) console.log(JSON.stringify(await convertSfzToJs(sfzText, sfzDir), null, 2));
      if (options.xml) console.log(await convertSfzToXml(sfzText, sfzDir));
    } else if (fileExt === 'xml') {
      const sfzXml: string = fileText(filepath);
      if (options.json) console.log(JSON.stringify(convertXmlToJs(sfzXml), null, 2));
      if (options.sfz) console.log(convertXmlToSfz(sfzXml));
    } else {
      console.log(`Unsupported file extension ${fileExt}`);
    }
  });

export { convert };
