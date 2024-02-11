import { Command } from 'commander';
import {
  convertJsToXml,
  convertJsToYaml,
  convertSetLoader,
  convertSfzToJs,
  dirRead,
  encode,
  fileCreate,
  fileReadString,
  log,
  logEnable,
  pathGetDirectory,
} from '@sfz-tools/core';
import path from 'path';
import { ParseDefinition } from '@sfz-tools/core/dist/types/parse';

function replaceAudioExt(filePath: string) {
  return filePath.replace(/\.(flac|wav)/g, '.ogg');
}

const compactCmd = new Command('compact')
  .arguments('<directory>')
  .option('-l, --log', 'Enable logging')
  .description('Create compact version of an sfz instrument')
  .action(async (directory: string, options: { log?: boolean }) => {
    if (options.log) logEnable();

    // Compact sfz files
    const pathsSfz: string[] = dirRead(`${directory}**/*.sfz`);
    for (const pathSfz of pathsSfz) {
      const file: string = fileReadString(pathSfz);
      const fileDir: string = pathGetDirectory(pathSfz, path.sep);
      log('pathSfz', pathSfz);
      log('fileDir', fileDir);
      convertSetLoader(fileReadString);
      const fileJs: ParseDefinition = await convertSfzToJs(file, fileDir);
      fileCreate(pathSfz + '.json', replaceAudioExt(JSON.stringify(fileJs, null, 2)));
      fileCreate(pathSfz + '.xml', replaceAudioExt(convertJsToXml(fileJs)));
      fileCreate(pathSfz + '.yaml', replaceAudioExt(convertJsToYaml(fileJs)));
    }

    // Compact audio files
    const pathsAudio: string[] = dirRead(`${directory}**/*.{flac,wav}`);
    log('pathsAudio', pathsAudio);
    for (const pathAudio of pathsAudio) {
      encode(pathAudio, { ogg: true });
    }
  });

export { compactCmd };
