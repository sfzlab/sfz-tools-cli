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
  fileCreate,
  fileReadJson,
  fileReadString,
  log,
  logEnable,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
} from '@sfz-tools/core';
import { ParseDefinition } from '@sfz-tools/core/dist/types/parse';
import path from 'path';

function outputFile(fileData: string, filePath: string, write?: boolean) {
  console.log(fileData);
  if (write) {
    if (filePath.startsWith('http')) {
      const filename: string = pathGetFilename(filePath);
      const ext: string = pathGetExt(filePath);
      fileCreate(`${filename}.${ext}`, fileData);
    } else {
      fileCreate(filePath, fileData);
    }
  }
}

function replaceExt(filePath: string, fileExt: string, newExt: string) {
  return filePath.replace(`.${fileExt}`, `.${newExt}`);
}

const convert = new Command('convert')
  .arguments('<filepath>')
  .option('-j, --json', 'Output as json')
  .option('-s, --sfz', 'Output as sfz')
  .option('-x, --xml', 'Output as xml')
  .option('-l, --log', 'Enable logging')
  .option('-w, --write', 'Write converted files')
  .description('Convert sfz files to other formats')
  .action(
    async (
      filepath: string,
      options: { json?: boolean; sfz?: boolean; xml?: boolean; log?: boolean; write?: boolean }
    ) => {
      if (options.log) logEnable();
      let files: string[] = [];
      // Load remote url or local file
      if (filepath.startsWith('http')) {
        files = [filepath];
      } else {
        files = dirRead(filepath);
      }
      log('files', files);
      // loop through remote/local files
      for (const file of files) {
        const fileExt: string = pathGetExt(file);
        if (fileExt === 'json') {
          const sfzJs: ParseDefinition = file.startsWith('http') ? await apiJson(file) : fileReadJson(file);
          if (options.sfz) outputFile(convertJsToSfz(sfzJs), replaceExt(file, fileExt, 'sfz'), options.write);
          if (options.xml) outputFile(convertJsToXml(sfzJs), replaceExt(file, fileExt, 'xml'), options.write);
        } else if (fileExt === 'sfz') {
          const sfzDir: string = pathGetDirectory(file, path.sep);
          const sfzText: string = file.startsWith('http') ? await apiText(file) : fileReadString(file);
          if (options.json)
            outputFile(
              JSON.stringify(await convertSfzToJs(sfzText, sfzDir), null, 2),
              replaceExt(file, fileExt, 'json'),
              options.write
            );
          if (options.xml)
            outputFile(await convertSfzToXml(sfzText, sfzDir), replaceExt(file, fileExt, 'xml'), options.write);
        } else if (fileExt === 'xml') {
          const sfzXml: string = file.startsWith('http') ? await apiText(file) : fileReadString(file);
          if (options.json)
            outputFile(
              JSON.stringify(convertXmlToJs(sfzXml), null, 2),
              replaceExt(file, fileExt, 'json'),
              options.write
            );
          if (options.sfz) outputFile(convertXmlToSfz(sfzXml), replaceExt(file, fileExt, 'sfz'), options.write);
        } else {
          console.log(`Unsupported file extension ${fileExt}`);
        }
      }
    }
  );

export { convert };
