import { Command } from 'commander';
import * as wav from 'node-wav';
import {
  analyzeLoad,
  analyzeNotes,
  dirRead,
  fileCreate,
  log,
  logEnable,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
  pathReplaceVariables,
} from '@sfz-tools/core';
import { AnalyzeFile, AnalyzeNote } from '@sfz-tools/core/dist/types/analyze';

const spliceCmd = new Command('splice')
  .arguments('<filepath>')
  .option('-r, --rename <pattern>', 'Rename pattern')
  .option('-l, --log', 'Enable logging')
  .description('Splice audio files into separate notes')
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
      const file: AnalyzeFile = analyzeLoad(fileitem);
      const notes: AnalyzeNote[] = analyzeNotes(file, true);
      log(notes);
      notes.forEach((note: AnalyzeNote, noteIndex: number) => {
        log(note);
        let fileRenamed: string = `${fileName}_${noteIndex}`;
        if (options.rename) fileRenamed = pathReplaceVariables(`${fileName}${options.rename}`, note);
        const fileBuffer: Buffer = wav.encode(note.channelData as any, { sampleRate: note.sampleRate });
        fileCreate(`${fileDir}/${fileRenamed}.${fileExt}`, fileBuffer);
      });
    }
  });

export { spliceCmd };
