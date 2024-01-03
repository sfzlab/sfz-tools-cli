import { Command } from 'commander';
import { apiBuffer, dirRead, encode, fileCreate, log, logEnable, pathGetExt, pathGetFilename } from '@sfz-tools/core';
import { EncodeOptions } from '@sfz-tools/core/dist/types/encode';

interface EncodeOptionsCli extends EncodeOptions {
  log?: boolean;
}

const encodeCmd = new Command('encode')
  .arguments('<filepath>')
  .option('-f, --flac', 'Output as flac')
  .option('-o, --ogg', 'Output as ogg')
  .option('-w, --wav', 'Output as wav')
  .option('-l, --log', 'Enable logging')
  .description('Encode audio files into other formats')
  .action(async (filepath: string, options: EncodeOptionsCli) => {
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
    for (const fileitem of files) {
      encode(fileitem, options);
    }
  });

export { encodeCmd };
