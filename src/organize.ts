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
  pathReplaceVariables,
} from '@sfz-tools/core';

const organizeCmd = new Command('organize')
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
    for (const fileitem of files) {
      const fileDir: string = pathGetDirectory(fileitem);
      const fileExt: string = pathGetExt(fileitem);
      const fileName: string = pathGetFilename(fileitem);
      const fileParsed: any = filenameParse(fileName);
      if (!fileParsed.round) fileParsed.round = 1;
      log(fileitem, fileParsed);
      if (options.rename) {
        let fileRenamed: string = pathReplaceVariables(options.rename, fileParsed);
        if (fileParsed.other) fileRenamed = pathReplaceVariables(fileRenamed, fileParsed.other);
        fileMove(fileitem, `${fileDir}/${fileRenamed}.${fileExt}`);
      }
    }
  });

export { organizeCmd };
