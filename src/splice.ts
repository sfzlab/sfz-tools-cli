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
} from '@sfz-tools/core';
import { AnalyzeFile, AnalyzeNote } from '@sfz-tools/core/dist/types/analyze';

const splice = new Command('splice')
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
      const file: AnalyzeFile = analyzeLoad(filePath);
      const notes: AnalyzeNote[] = analyzeNotes(file, true);
      log(notes);
      notes.forEach((note: AnalyzeNote, noteIndex: number) => {
        log(note);
        let fileRenamed: string = `${fileName}_${noteIndex}`;
        if (options.rename) {
          fileRenamed = `${fileName}${options.rename}`;
          if (note.start) fileRenamed = fileRenamed.replace('$start', note.start as any);
          if (note.duration) fileRenamed = fileRenamed.replace('$duration', note.duration as any);
          if (note.loudness) fileRenamed = fileRenamed.replace('$loudness', note.loudness as any);
          if (note.midi) fileRenamed = fileRenamed.replace('$midi', note.midi as any);
          if (note.octave) fileRenamed = fileRenamed.replace('$octave', note.octave as any);
          if (note.name) fileRenamed = fileRenamed.replace('$name', note.name as any);
        }
        const fileBuffer: Buffer = wav.encode(note.channelData as any, { sampleRate: note.sampleRate });
        fileCreate(`${fileDir}/${fileRenamed}.${fileExt}`, fileBuffer);
      });
    }
  });

export { splice };
