import { Command } from 'commander';
import {
  dirRead,
  fileMove,
  filenameParse,
  log,
  logEnable,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
} from '@sfz-tools/core';

const organize = new Command('organize')
  .arguments('<filepath>')
  .option('-r, --rename <pattern>', 'Rename pattern')
  .option('-l, --log', 'Enable logging')
  .description('Organize files using pattern')
  .action(async (filepath: string, options: { rename?: string; log?: boolean }) => {
    if (options.log) logEnable();
    let files: string[] = [];
    // Load remote url or local file
    if (filepath.startsWith('http')) {
      files = [filepath];
    } else {
      files = dirRead(filepath);
    }
    // loop through remote/local files
    for (const filePath of files) {
      const fileDir: string = pathGetDirectory(filePath);
      const fileExt: string = pathGetExt(filePath);
      const fileName: string = pathGetFilename(filePath);
      const fileParsed: any = filenameParse(fileName);
      if (!fileParsed.round) fileParsed.round = 1;
      log(fileParsed);
      if (options.rename) {
        let fileRenamed: string = options.rename;
        if (fileParsed.dynamics) fileRenamed = fileRenamed.replace('$dynamics', fileParsed.dynamics);
        if (fileParsed.note) fileRenamed = fileRenamed.replace('$note', fileParsed.note);
        if (fileParsed.round) fileRenamed = fileRenamed.replace('$round', fileParsed.round);
        if (fileParsed.velocity) fileRenamed = fileRenamed.replace('$velocity', fileParsed.velocity);
        if (fileParsed.other) {
          fileParsed.other.forEach((otherItem: string, otherIndex: number) => {
            fileRenamed = fileRenamed.replace(`$other[${otherIndex}]`, otherItem);
          });
        }
        fileMove(filePath, `${fileDir}/${fileRenamed}.${fileExt}`);
      }
    }
  });

export { organize };
