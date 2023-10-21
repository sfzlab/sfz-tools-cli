import { Command } from 'commander';
import {
  apiBuffer,
  dirRead,
  encodeFlacToOgg,
  encodeFlacToWav,
  encodeOggToFlac,
  encodeOggToWav,
  encodeWavToFlac,
  fileCreate,
  log,
  logEnable,
  pathGetExt,
  pathGetFilename,
} from '@sfz-tools/core';

const encode = new Command('encode')
  .arguments('<filepath>')
  .option('-f, --flac', 'Output as flac')
  .option('-o, --ogg', 'Output as ogg')
  .option('-w, --wav', 'Output as wav')
  .option('-l, --log', 'Enable logging')
  .description('Encode audio files into other formats')
  .action(async (filepath: string, options: { flac?: boolean; ogg?: boolean; wav?: boolean; log?: boolean }) => {
    if (options.log) logEnable();
    let files: string[] = [];
    // Load remote url or local file
    if (filepath.startsWith('http')) {
      const fileData: Buffer = await apiBuffer(filepath);
      const filename: string = pathGetFilename(filepath);
      const ext: string = pathGetExt(filepath);
      fileCreate(`${filename}.${ext}`, fileData);
      files = [`${filename}.${ext}`];
    } else {
      files = dirRead(filepath);
    }
    log('files', files);
    // loop through remote/local files
    for (const file of files) {
      const fileExt: string = pathGetExt(file);
      if (fileExt === 'flac') {
        if (options.ogg) encodeFlacToOgg(file);
        if (options.wav) encodeFlacToWav(file);
      } else if (fileExt === 'ogg') {
        if (options.flac) encodeOggToFlac(file);
        if (options.wav) encodeOggToWav(file);
      } else if (fileExt === 'wav') {
        if (options.flac) encodeWavToFlac(file);
        if (options.ogg) encodeWavToFlac(file);
      } else {
        console.log(`Unsupported file extension ${fileExt}`);
      }
    }
  });

export { encode };
