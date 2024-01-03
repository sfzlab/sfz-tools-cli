import { Command } from 'commander';
import { analyze, apiBuffer, dirRead, fileCreate, logEnable, pathGetExt, pathGetFilename, log } from '@sfz-tools/core';
import { AnalyzeOptions } from '@sfz-tools/core/dist/types/analyze';

interface AnalyzeOptionsCli extends AnalyzeOptions {
  log?: boolean;
}

const analyzeCmd = new Command('analyze')
  .arguments('<filepath>')
  .option('-da, --danceability', 'Danceability value from 0 to ~3')
  .option('-du, --duration', 'Duration in seconds (s)')
  .option('-en, --energy', 'Energy value')
  .option('-ke, --key', 'Key from A to G')
  .option('-l, --log', 'Enable logging')
  .option('-lo, --loudness', 'Loudness in decibels (dB)')
  .option('-no, --notes', 'Note list with each start (s), duration (s), loudness (dB), midi, name and octave values')
  .option('-on, --onsets', 'Note offset values')
  .option('-pi, --pitch', 'Pitch object containing frequency, midi, name, midi and octave values')
  .option('-sc, --scale', 'Scale of the key (major or minor)')
  .option('-sp, --speed', 'Speed estimation in beats per minute (bpm)')
  .description('Analyze audio files to detect audio features')
  .action(async (filepath: string, options: AnalyzeOptionsCli) => {
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
      log(fileitem);
      console.log(analyze(fileitem, options));
    }
  });

export { analyzeCmd };
