import { Command } from 'commander';
import {
  apiJson,
  apiText,
  convertJsToSfz,
  convertJsToXml,
  convertSfzToJs,
  convertSfzToXml,
  convertXmlToJs,
  convertXmlToSfz,
  dirRead,
  fileReadJson,
  fileReadString,
  log,
  logEnable,
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
    let files: string[] = [];
    // Load remote url or local file
    if (filepath.startsWith('http')) {
      files = [filepath];
    } else {
      files = dirRead(filepath);
    }
    // loop through remote/local files
    for (const file of files) {
      const fileExt: string = pathGetExt(file);
      if (fileExt === 'json') {
        const sfzJs: ParseDefinition = file.startsWith('http') ? await apiJson(file) : fileReadJson(file);
        if (options.sfz) console.log(convertJsToSfz(sfzJs));
        if (options.xml) console.log(convertJsToXml(sfzJs));
      } else if (fileExt === 'sfz') {
        const sfzDir: string = pathGetDirectory(file);
        const sfzText: string = file.startsWith('http') ? await apiText(file) : fileReadString(file);
        if (options.json) console.log(JSON.stringify(await convertSfzToJs(sfzText, sfzDir), null, 2));
        if (options.xml) console.log(await convertSfzToXml(sfzText, sfzDir));
      } else if (fileExt === 'xml') {
        const sfzXml: string = file.startsWith('http') ? await apiText(file) : fileReadString(file);
        if (options.json) console.log(JSON.stringify(convertXmlToJs(sfzXml), null, 2));
        if (options.sfz) console.log(convertXmlToSfz(sfzXml));
      } else {
        console.log(`Unsupported file extension ${fileExt}`);
      }
    }
  });

export { convert };
