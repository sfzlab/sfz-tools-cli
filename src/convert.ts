import { Command } from 'commander';
import {
  apiJson,
  apiText,
  convert,
  convertSetLoader,
  dirRead,
  fileCreate,
  fileReadJson,
  fileReadString,
  log,
  logEnable,
  pathGetExt,
  pathGetFilename,
} from '@sfz-tools/core';
import path from 'path';
import { ConvertOptions } from '@sfz-tools/core/dist/types/convert';

interface ConvertOptionsCli extends ConvertOptions {
  log?: boolean;
  write?: boolean;
}

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

const convertCmd = new Command('convert')
  .arguments('<filepath>')
  .option('-j, --js', 'Output as json')
  .option('-s, --sfz', 'Output as sfz')
  .option('-x, --xml', 'Output as xml')
  .option('-y, --yaml', 'Output as yaml')
  .option('-l, --log', 'Enable logging')
  .option('-w, --write', 'Write converted files')
  .description('Convert sfz files to other formats')
  .action(async (filepath: string, options: ConvertOptionsCli) => {
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
    for (const fileitem of files) {
      const fileExt: string = pathGetExt(fileitem);
      let file: any;
      if (fileExt === 'json') {
        file = filepath.startsWith('http') ? await apiJson(fileitem) : fileReadJson(fileitem);
      } else {
        file = filepath.startsWith('http') ? await apiText(fileitem) : fileReadString(fileitem);
      }
      convertSetLoader(fileReadString);
      const fileConverted: any = await convert(fileitem, file, options, path.sep);
      if (options.js)
        outputFile(JSON.stringify(fileConverted, null, 2), replaceExt(fileitem, fileExt, 'json'), options.write);
      if (options.sfz) outputFile(fileConverted, replaceExt(fileitem, fileExt, 'sfz'), options.write);
      if (options.xml) outputFile(fileConverted, replaceExt(fileitem, fileExt, 'xml'), options.write);
      if (options.yaml) outputFile(fileConverted, replaceExt(fileitem, fileExt, 'yaml'), options.write);
    }
  });

export { convertCmd };
